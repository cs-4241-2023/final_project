import { NavigateFunction } from "react-router-dom";

export enum Method {
    POST = 'POST',
    GET = 'GET',
}

export async function fetchServer(method: Method, url: string, content: any): Promise<{status: number, content: any}> {

    let json = JSON.stringify(content);

    const response = await fetch( url, {
        method: method.toString(),
        headers: {'Content-Type': 'application/json'},
        body: json
    });

    const result = await response.json();
    return {status: response.status, content: result};
}

// fetchServer but also checks if authenticated. if not, redirects to login page
export async function fetchServerAuth(navigate: NavigateFunction, method: Method, url: string, content: any): Promise<{status: number, content: any}> {
    const response = await fetchServer(method, url, content);

    // if not logged in, redirect to login page
    if (response.status === 401) {
        console.log("Not logged in. Redirecting to login page");
        navigate('/');
    }

    return response;

}