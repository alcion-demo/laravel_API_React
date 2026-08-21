// utils/apiFetch.ts

const API_URL = 'http://localhost:8000';

const getXsrfToken = () => {
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='));

    return match
        ? decodeURIComponent(match.split('=')[1])
        : '';
};

export const apiFetch = async (
    path: string,
    options: RequestInit = {}
) => {
    const xsrfToken = getXsrfToken();

    return fetch(`${API_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
            ...options.headers,
        },
    });
};