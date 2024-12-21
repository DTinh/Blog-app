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
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
module.exports = {
    getAllPost, createNewPost, getDetailPost
}