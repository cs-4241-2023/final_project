import boto3

# Create boto3 clients.
s3_client = boto3.client('s3')

def lambda_handler(event: dict, context: object) -> dict:
    """
    Delete all files in the "24ours-files" bucket. This function will be called 
    every day at 12 am (midnight) EST.
    """
    # Define variables.
    bucket_name = '24ours' # The name of the bucket to wipe files from.
    file_names = [] # A list of the names of all the files in the bucket.
    
    # Get a list of all the files in the bucket.
    response_iterator = s3_client.get_paginator('list_objects_v2').paginate(
        Bucket=bucket_name
    )
    
    # Add all the files names to 'file_names'.
    for page in response_iterator:
        # No files to delete.
        if 'Contents' not in page:
            # Success. Return early since there are no files to delete.
            return {
                'statusCode': 200,
                'body': f'No files to delete. \"{bucket_name}\" is already empty.'
            }
        
        # Add the file names in this page to 'file_names'.
        for file in page['Contents']:
            file_names.append(file['Key'])
    
    # Delete the files.
    response = s3_client.delete_objects(
        Bucket=bucket_name,
        Delete={
            'Objects': [{'Key': name} for name in file_names] 
        }
    )
    
    # Success. Files were deleted.
    return {
        'statusCode': 200,
        'body': f'Files deleted. \"{bucket_name}\" is now empty.'
    }
