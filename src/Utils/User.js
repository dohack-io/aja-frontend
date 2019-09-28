import axios from "axios";
require("dotenv").config();


export default class User {

    constructor(domain) {
        this.domain = process.env.REACT_APP_API;
    }

    getGardens(id) {
        debugger
        return  axios.get(`${process.env.REACT_APP_API}/user/${id}/gardens`)
                .then(function (res) {
                    debugger
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
}
