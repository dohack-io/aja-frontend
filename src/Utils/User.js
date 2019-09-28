import axios from "axios";
require("dotenv").config();


export default class User {

    constructor(domain) {
        this.domain = process.env.REACT_APP_API;
    }

    getGardens(id) {
        return  axios.get(`${process.env.REACT_APP_API}/user/${id}/gardens`)
                .catch(function (error) {
                    console.log(error);
                })
    }

    getSingleGarden(id) {
        return  axios.get(`${process.env.REACT_APP_API}/garden/${id}`)
                .catch(function (error) {
                    console.log(error);
                })
    }
}
