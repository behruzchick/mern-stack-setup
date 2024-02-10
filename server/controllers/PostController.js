const { YoureModel } = require('../models/YoureCard');
// const {} = require('../errors/403Error')
const {PostnotFound404,userNotFound404} = require('../errors/404Error')
const {internalServerError} = require('../errors/500Error');


const createPost = async (req, res) => {
    try {
        const file = req.file;

        if (!file.originalname) {
            return res.status(403).json({ message: 'Please upload a file!' });
        }


        const savedFile = await YoureModel.create({
            img: { name: file.originalname, data: file.buffer },       
        });

        res.json({
            message: 'File uploaded successfully',
            file: savedFile,
        });
    } catch (error) {
        console.error(error);
        return internalServerError(req,res)
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await YoureModel.find();

        if (!posts) {
            return PostnotFound404(req,res)
        }
        res.json(posts)

    }catch (error) {
        console.log(error);
    }
}


module.exports = {
    createPost,
    getAllPosts
}