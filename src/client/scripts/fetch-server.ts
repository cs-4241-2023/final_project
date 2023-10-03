export async function fetchServer(url: string, content: any): Promise<{status: number, content: any}> {

    let json = JSON.stringify(content);

    const response = await fetch( url, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: json
    });

    const result = await response.json();
    return {status: response.status, content: result};
}