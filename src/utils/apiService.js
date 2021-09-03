import { getCookie } from './helpers';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const getBody = (url, method, body) => {
  const params = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getCookie('token');
  console.log(
    'TOKEN',
    token,
    !url.includes('login') && !url.includes('signup')
  );

  if (!url.includes('login') && !url.includes('signup')) {
    params.headers['authorization'] = `Bearer ${token}`;
  }

  if (method === 'PUT' || method === 'POST') {
    params['body'] = JSON.stringify(body);
  }

  return params;
};

const get = (url) =>
  fetch(baseUrl + url + '/', getBody(url, 'GET')).then((res) => res.json());

const post = (url, body) =>
  fetch(baseUrl + url + '/', getBody(url, 'POST', body)).then((res) =>
    res.json()
  );

const put = (url, body) =>
  fetch(baseUrl + url + '/', getBody(url, 'PUT', body)).then((res) =>
    res.json()
  );

const del = (url) =>
  fetch(baseUrl + url + '/', getBody(url, 'DELETE')).then((res) => res.json());

export const apiCall = {
  get,
  post,
  put,
  delete: del,
};

// import { getCookie, signout } from './helpers';

// const baseUrl = process.env.REACT_APP_SERVER_URL;
// const getBody = (method, body) => {
//   const token = getCookie('token');

//   const params = {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json',
//       authorization:
//         // `Bearer ${token}`,
//         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MzA2NjU2NDYsImlhdCI6MTYzMDU3OTI0Nn0.d21dvo-5KDCl59kFLwN_bBxHGpEzHD8Q-6J3ZKeQ--IeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MzA2NjU2NDYsImlhdCI6MTYzMDU3OTI0Nn0.d21dvo-5KDCl59kFLwN_bBxHGpEzHD8Q-6J3ZKeQ--I',
//     },
//   };
//   if (method === 'PUT' || method === 'POST') {
//     params['body'] = JSON.stringify(body);
//   }

//   return params;
// };

// const modifiedPromise = (promise) => promise.then((res) => res.json());

// const get = (url) =>
//   modifiedPromise(fetch(baseUrl + url + '/', getBody('GET')));

// const post = (url, body) =>
//   modifiedPromise(fetch(baseUrl + url + '/', getBody('POST', body)));

// const put = (url, body) =>
//   modifiedPromise(fetch(baseUrl + url + '/', getBody('PUT', body)));

// const del = (url) =>
//   modifiedPromise(fetch(baseUrl + url + '/', getBody('DELETE')));

// export const apiCall = {
//   get,
//   post,
//   put,
//   delete: del,
// };
