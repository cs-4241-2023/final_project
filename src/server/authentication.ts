import express, { Express } from "express";
import session, { SessionOptions } from "express-session";
import { Database } from "./database";
import mongoose from "mongoose";

// Declare that the session will contain a username
declare module 'express-session' {
    interface SessionData {
      userID?: mongoose.Types.ObjectId;
    }
  }

export class Authentication {

    constructor(private app: Express, private database: Database) {

        // Use sessions for tracking logins
        const sessionConfig: SessionOptions = {
            secret: process.env.SESSION_SECRET as string, // Asserting this as string. Ensure that this environment variable is set.
            resave: false,
            saveUninitialized: false,
            cookie: {
            httpOnly: true,
            secure: false,
            },
        };

    app.use(session(sessionConfig));
        
    }

    // attempt to login with username and password. return true if successful, false otherwise
    public async login(username: string, password: string, req: express.Request, res: express.Response): Promise<{status: number, message: string}> {
    
        try {
        
            const user = await this.database.getUserByUsername(username);
        
            if (!user || password !== user.password) {
              console.log('Invalid username or password');
              return {status: 400, message: 'Invalid username or password'};
            }
        
            console.log('User logged in successfully');
            req.session.userID = user._id; // store userID in session
            return {status: 200, message: 'User loged in successfully'};
        
          } catch (error) {
            return {status: 500, message: 'Internal Server Error'};
          }
    }

    // attempt to sign up with username and password. return true if successful, false otherwise
    public async signup(username: string, password: string, req: express.Request, res: express.Response): Promise<{status: number, message: string}> {

        try {
        
            const user = await this.database.getUserByUsername(username);
        
            if (user) {
              console.log('Username already exists');
              return {status: 400, message: 'Username already exists'};
            }
        
            console.log('Creating new user');
            let userID = await this.database.createUser(username, password);
            console.log('User created successfully', userID);
            req.session.userID = userID; // store userID in session
            return {status: 200, message: 'User created successfully'};
        
          } catch (error) {
            return {status: 500, message: 'Internal Server Error'};
          }
    }

    public logout(req: express.Request, res: express.Response): Promise<{ status: number; message: string }> {
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Server Error' });
                    return;
                }
                res.clearCookie('sid');
                resolve({ status: 200, message: 'User logged out successfully' });
            });
        });
    }

    public isLoggedIn(req: express.Request): boolean {
        return req.session.userID !== undefined;
    }

    public getUsername(req: express.Request): mongoose.Types.ObjectId | undefined {
        return req.session.userID;
    }

}
