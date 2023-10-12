import { NavigateFunction } from "react-router-dom";

export function getBaseURL(): string {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

}

export enum Method {
    POST = 'POST',
    GET = 'GET',
}

export async function fetchServer(method: Method, urlStr: string, content: any = undefined): Promise<{status: number, content: any}> {

    let url = new URL(urlStr, getBaseURL());
    let json = undefined;

    if (method === Method.POST) {
        json = JSON.stringify(content);
    } else {
        for (const [key, value] of Object.entries(content)) {
            console.log(key, value);
            url.searchParams.append(key, value as string);
        }
    }

    console.log("fetching", url, json)

    const response = await fetch( url, {
        method: method.toString(),
        headers: {'Content-Type': 'application/json'},
        body: json
    });

    const result = await response.json();
    return {status: response.status, content: result};
}

interface Response {
    status: number,
    content: any,
}
// fetchServer but also checks if authenticated. if not, redirects to login page
export function verifyAuth(navigate: NavigateFunction, {status, content}: Response): {status: number, content: any} {

    // if not logged in, redirect to login page
    if (status === 401) {
        console.log("Not logged in. Redirecting to login page");
        navigate('/');
    }

    return {status, content};

}