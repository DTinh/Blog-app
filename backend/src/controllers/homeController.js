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

module.exports = {
    getAllPost, createPost, getDetailPost
}