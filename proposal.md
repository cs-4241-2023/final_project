Group: Will Dufault, Colin Fyock, Matt Lacadie, Marek Garbaczonek

Our project will be a file-sharing site except all files will be deleted every day at midnight. The project will use React with Typescript and Boostrap to design the UI, and we will use Node.js to serve our files. We will send post requests from the client to the Node.js server, which will be able to invoke our AWS Lambda functions through API Gateway. This will allow users to register and log in (Cognito), and upload/download files to/from S3.

We will have all files be stored in an S3 bucket which will be deleted every day at midnight. This event will be triggered by EventBridge, which will invoke a Lambda function that goes into the S3 bucket and deletes all files. Assuming that Glitch (or whatever site we decide to use) has static IPs, we will enable inbound and outbound traffic in our VPC to/from that specific IP (or CIDR range) so that only traffic to/from that IP will be allowed.

![image](https://github.com/willdufault/cs4241-final-project-proposal/assets/99445180/d45101fb-e787-43bc-a968-a6b861ffdfd6)
