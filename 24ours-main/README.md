# 24ours
https://twentyfourours-718556141502.herokuapp.com/

Static web page content and design. You should have a project that is accessible, easily navigable, and features significant content:

We used React and Boostrap to create a static web page and style it.

Dynamic behavior implemented with JavaScript (TypeScript is also allowed if your group wants to explore it):

The dynamic behavior changes the URL shown on the page according to what is uploaded. The text changes based on what happens, file upload too big, or it was successful. Also when you clear the file from the page.

Server-side programming using Node.js. Typically this will take the form of some sort of persistent data (database), authentication, and possibly server-side computation:

We used express.js, node.js to host the website files, connect frontend and backend. Axios to make post requests from frontend to the node server and then node server to AWS to our lambda functions, managing the send and response. 

Any additional instructions that might be needed to fully use your project (login information etc.):

You can upload a file of any type to the website as long as it is below 5 MB. This file can be dragged into the website or you can click the upload button to bring up a file explorer. The submit button uploads the file to the Amazon S3 Bucket, and creates a link that can be copied as a download to that file.

An outline of the technologies you used and how you used them:

We used React and Bootstrap for the frontend in styling and functionality. We used node.js, express.js in our server to manage post requests to AWS and to serve our files. We used Amazon's Lambda function feature to write lambda funcitons in python using boto3, base64decode, json in order to convert files from base64 back into normal file formats in order to be stored in the S3 bucket.

What challenges you faced in completing the project:

We had a lot of problem with uploading files and compressing them in order to send them to the AWS payload. We used a bunch of different libraries before deciding on doing base 64 encoding. We tried string compression but the payload would not read the string correctly and would read the error invalid string. We ended up taking the file on the frontend, encoding it into base 64 and sending it to the AWS, and then in the Lambda function we would decode the base 64 into a readable file and then store that file in the S3 bucket. The dragging box for the frontend of the website gave us a lot of issues. Communication between node js and the frontend with React was a big problem, we got several Axios errors and body-parser errors. Before we added body-parser, we would upload payloads that were super small but they would say that it was too large of a payload to send. We first increased the size of the axios payload using the maxContentLength: 100000000, maxBodyLength: 1000000000 parameters but this did not fix the issue. We then added the body-parser package, where we set the maximum payload size to 10 MB, because when you encode to base 64 the size of the payload increase by about 1.5x the size.

What each group member was responsible for designing / developing:

Colin and Will:

Developed the server in node js along with building the lambda functions and managing the S3 bucket along with the other AWS features. 


Marek and Matt:

Developed the frontend in React and Bootstrap developing the upload feature. Matt made the 24ours logos, it is awesome.


A link to your project video.

https://drive.google.com/file/d/19ORvPobR4NMSS6ljBg4FlKvfAuM0fGjU/view?usp=sharing)https://drive.google.com/file/d/19ORvPobR4NMSS6ljBg4FlKvfAuM0fGjU/view?usp=sharing
