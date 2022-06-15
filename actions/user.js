import fetch from "isomorphic-fetch";
import { API } from "../config";


export const userPublicProfile = (username) => {
  return fetch(`${API}/profile/${username}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProfile = token => {
    return fetch(`${API}/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (token, user) => {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : user
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};