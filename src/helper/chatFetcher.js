import axios from "axios";
import {chat_base_url } from "../config/constants";
import { getItemFromLocalStorage } from "./useLocalStorage";

const chatFetcher = axios.create({
    baseURL: chat_base_url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add a response interceptor
chatFetcher.interceptors.request.use(
    async function (config) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        let user = await getItemFromLocalStorage("user");
        // console.log("Logged User name >>>> ", user.jwt.token)
        console.log(user.jwt.token, "user?.jwt?.token")
        config.headers.Authorization = `Bearer ${user?.jwt?.token}`;

        // console.log("Async >>>> ", config.headers.Authorization);

        return config;
    },
    function (error) {
        console.log("Error >>>> ", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default chatFetcher;