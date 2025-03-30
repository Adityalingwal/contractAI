const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export async function post(url = '', data = {}) {
  const fullUrl = API_BASE_URL + url;
  
  const response = await fetch(fullUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: process.env.NODE_ENV === 'production' ? 'include' : 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  if (response.status === 401) {
    window.location.href = '/login';
  }
  return response.json();
}


