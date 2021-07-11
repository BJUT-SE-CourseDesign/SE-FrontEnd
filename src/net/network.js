const axios = require("axios").default;
const host = "http://se.renjikai.com:8000/";


export function userRegister(data) {
    const url = host + "users/register";
    axios.post(url, {
        'username': data.username,
        'password': data.password,
    }).then(res => {
        console.log(res);
    });
}