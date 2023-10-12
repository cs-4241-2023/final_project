import boto3
from base64 import b64decode

# Create boto3 clients.
s3_client = boto3.client('s3')

def lambda_handler(event: dict, context: object) -> dict:
    """
    Create a file from the given file name and body, then upload it to the 
    "24Ours" S3 bucket and send the presigned (temporary) URL to the file back.
    """

    # Send the body and name of the file to the s3 and get a response
    response = s3_client.put_object(
        # The body is the decoded event which is recieved in base 64
        Body = b64decode(event["fileBody"]),
        # The key is the fileName of the event
        Key = event["fileName"],
        # The S3 Bucket in which we store our files is named 24ours
        Bucket="24ours"
    )
    
    # Create a custom url on the fly that expires in 24 hours (the function takes seconds so its 86,400s)
    # The url does not link to the s3 since it is private but makes a temporary link to the s3
    get_url = s3_client.generate_presigned_url('get_object',
    # The bucket is named 24ours and the key to the item in the bucket is the name of the file, for example: bee.jpg
        Params = {
            'Bucket': "24ours",
            'Key': event["fileName"]
        },
        ExpiresIn = 86400
    )
    
    # Return the default success status code and put url in the response body to be copied on the page
    return {
        'statusCode': 200,
        'body': {
            "url": get_url
        }
    }
