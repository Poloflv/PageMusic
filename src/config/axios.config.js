import axios from "axios";

const axiosMusic = axios.create({
    baseURL:"https://playlist-share-dev.fl0.io"
})

axiosMusic.interceptors.request.use((config) => {
    config.headers.Authorization = `JWT ${JSON.parse(localStorage.getItem("userInfo"))?.state.user.token}`

    return config
})

export {
    axiosMusic
}