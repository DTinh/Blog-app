import axios from "../axios";

const getAllPosts = () => {
    return axios.get(`http://localhost:1712/api/read`)
}
const getDetailPosts = (inputId) => {
    return axios.get(`http://localhost:1712/api/read-detail-by-id?id=${inputId}`)
}
const createNewPost = (data) => {
    return axios.post(`http://localhost:1712/api/create`, data)
}

export {
    getAllPosts, createNewPost, getDetailPosts
}
