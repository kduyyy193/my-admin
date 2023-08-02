const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// interface IHeaders {
//     'Content-Type': String,
//     Accept: String,
//     Authorization?: String,
// };

interface IRequestOptions {
    headers?: HeadersInit;
    body?: BodyInit;
    method?: string;
    redirect?: RequestRedirect;
    referrer?: string;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    referrerPolicy?: ReferrerPolicy;
    integrity?: string;
}

interface IRequest {
    url: String,
    body?: any,
    options: IRequestOptions
}


function getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
}

async function request({ url, body, options }: IRequest) {
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: { ...headers, ...options?.headers },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        const message = response.statusText || 'An error occurred';
        throw new Error(message);
    }
    return response.json();
}

export default {
    get({ url, options }: IRequest) {
        return request({ url, options: { ...options, method: 'GET' } });
    },
    post({ url, body, options }: IRequest) {
        return request({ url, options: { ...options, method: 'POST', body: JSON.stringify(body) } });
    },
    put({ url, body, options }: IRequest) {
        return request({ url, options: { ...options, method: 'PUT', body: JSON.stringify(body) } });
    },
    delete({ url, options }: IRequest) {
        return request({ url, options: { ...options, method: 'DELETE' } });
    },
};
