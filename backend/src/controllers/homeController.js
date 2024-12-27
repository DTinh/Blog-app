import homeService from '../services/homeService';

const getAllPost = async (req, res) => {
    try {
        let data = await homeService.getAllPost();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}
const createPost = async (req, res) => {
    try {
        let data = await homeService.createNewPost(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
const getDetailPost = async (req, res) => {
    try {
        let data = await homeService.getDetailPost(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
const deletePost = async (req, res) => {
    try {
        let data = await homeService.deletePost(req.body.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
const updatePost = async (req, res) => {
    try {
        let data = await homeService.updatePost(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
const handleLogin = async (req, res) => {
    try {
        let data = await homeService.handleLogin(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
const searchPosts = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let data = await homeService.searchPosts(searchTerm);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};
const handleRegister = async (req, res) => {
    try {
        let data = await homeService.handleRegister(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    getAllPost, createPost, getDetailPost, deletePost, updatePost, handleLogin, searchPosts, handleRegister
}