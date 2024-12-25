import { where } from 'sequelize';
import db from '../models/index';


const getAllPost = async () => {
    try {
        let data = await db.Post.findAll();
        if (data) {
            return {
                errCode: 0,
                errMessage: 'Get all post succeed',
                data: data
            }
        }

    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
const getDetailPost = async (inputId) => {
    try {
        if (!inputId) {
            return {
                errCode: 1,
                errMessage: 'Missing require parameter',
            }
        } else {
            let data = await db.Post.findOne({
                where: { id: inputId },
                raw: true
            })
            if (data) {
                return {
                    errCode: 0,
                    errMessage: 'Get detail post succeed',
                    data: data
                }
            }
        }

    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
const createNewPost = async (data) => {
    try {
        if (!data.title || !data.description || !data.contentMarkdown) {
            return {
                errCode: 2,
                errMessage: 'Missing required parameter',
                data: []
            }
        } else {
            await db.Post.create({
                title: data.title,
                description: data.description,
                contentMarkdown: data.contentMarkdown,
                contentHTML: data.contentHTML,
                image: data.image
            });
            return {
                errCode: 0,
                errMessage: 'Create a new post suceed!',
                data: data
            }

        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
const deletePost = async (id) => {
    try {
        let post = await db.Post.findOne({
            where: { id: id }
        })
        if (!post) {
            return {
                errCode: 2,
                errMessage: 'The post not fonud',
            }
        } else {
            await db.Post.destroy({
                where: { id: id }
            })
            return {
                errCode: 0,
                errMessage: 'Delete a post suceed!',
                data: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
const updatePost = async (data) => {
    try {
        if (!data.id) {
            return {
                errCode: 1,
                errMessage: 'Missing require prameter',
                data: ''
            }
        }
        let post = await db.Post.findOne({
            where: { id: data.id }
        })
        if (post) {
            await db.Post.update({
                title: data.title,
                description: data.description,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                image: data.image
            }, { where: { id: data.id } })
            return {
                errCode: 0,
                errMessage: 'Update user succeed',
                data: ''
            }
        } else {
            return {
                errCode: 2,
                errMessage: 'Post not fonud',
                data: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }

}
module.exports = {
    getAllPost, createNewPost, getDetailPost, deletePost, updatePost
}