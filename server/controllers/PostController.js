const { PostModel } = require('../models/Post');
// const {} = require('../errors/403Error')
const { PostnotFound404, userNotFound404 } = require('../errors/404Error')
const { internalServerError } = require('../errors/500Error');
const { userModel } = require('../models/User');


const createPost = async (req, res) => {
    try {
        const file = req.file;

        const user = await userModel.findById(req.params.id)

        if (!user) {
            return userNotFound404(req, res);
        }

        if (user.isAdmin === false) {
            return res.status(400).json({
                message: "No access!"
            })
        } else {
            const savedPost = await PostModel.create({
                title: req.body.title,
                description: req.body.description,
                user: req.params.id,
                img: { name: file.originalname, data: file.buffer },       
            });

            res.json({
                message: 'Post uploaded successfully',
                post: savedPost,
            });
        }
        // if (!file.originalname) {
        //     return res.status(403).json({ message: 'Please upload a file!' });
        // }


    } catch (error) {
        console.error(error);
        return internalServerError(req, res)
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().select('-img');

        if (!posts) {
            return PostnotFound404(req, res)
        }
        res.json(posts)

    } catch (error) {
        console.log(error);
    }
}

const getPost = async(req,res) => {
    try {
        const post = await PostModel.findById(req.params.id).select('-img');

        if(!post){
            return PostnotFound404(req,res);
        }

        res.json(post);
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const getPostImage = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await PostModel.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(file.img.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostImage,
    getPost
}