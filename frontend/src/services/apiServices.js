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
const deletePost = (inputId) => {
    return axios.delete(`http://localhost:1712/api/delete`, { data: { id: inputId.id } })
}
const updatePost = (data) => {
    return axios.put(`http://localhost:1712/api/update`, data)
}
const loginUser = (email, password) => {
    return axios.post(`http://localhost:1712/api/login`, { email, password })
}
const searchPostService = (searchTerm) => {
    return axios.get(`http://localhost:1712/api/search?searchTerm=${searchTerm}`)
}
const registerUser = (data) => {
    return axios.post(`http://localhost:1712/api/register`, data)
}
export {
    getAllPosts, createNewPost, getDetailPosts, deletePost, updatePost, loginUser, searchPostService, registerUser
}
