/* eslint-disable no-useless-catch */
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export default async function AJAX(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

/*
export const getJSON = async function (url) {
  const fetchPro = fetch(url);
  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message}(${res.status})`);
  return data;
};

export const sendJSON = async function (url, uploadData) {
  const fetchPro = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  });
  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message}(${res.status})`);
  return data;
};
*/
