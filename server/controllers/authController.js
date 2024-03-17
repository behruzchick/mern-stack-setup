const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require('../models/User')
const {emailArleadyUsed, confirmpassword, nameArleadyUsed, enterNameError, enterEmailError, passwordLengthError, wrongPassword, enterPasswordError} = require('../errors/403Error')
const {userNotFound404,PostnotFound404} = require('../errors/404Error')
const {internalServerError,noAccessError} = require('../errors/500Error')

const signUp = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new userModel({
            name: req.body.name,
            surname: req.body.surname,
            passwordHash: hash
        })

        const isName = await userModel.findOne({name:req.body.name});


        // if(req.body.password !== req.body.confirmpassword){
        //     return confirmpassword(req,res)
        // }

        if(isName){
            return nameArleadyUsed(req,res)
        }


        if(await req.body.name === "admin" && await req.body.email === "admin@gmail.com" && req.body.password === "admin123"){
            doc.isAdmin = true
        }
        doc.isLogged = true

        const user = await doc.save();

        // const token = jwt.sign(
        //     {
        //         _id: user._id
        //     },
        //     'secret123',
        //     {
        //         expiresIn: '20d'
        //     }
        // );
        
        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            // token
        })
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}



const signIn = async (req, res) => {
    try {
        const user = await userModel.findOne({ name: req.body.name });

        if (!user) {
            return userNotFound404(req,res)
        }

        const pass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!pass) {
            return wrongPassword(req,res)
        }

        user.isLogged = true
        // const token = jwt.sign(
        //     {
        //         _id: user._id
        //     },
        //     'secret123',
        //     {
        //         expiresIn: '30d'
        //     }
        // );
        const { passwordHash, ...userData } = user._doc
        res.json({
            ...userData,
        })
    } catch (error) {
        console.log(error);
        return internalServerError(req,res)
    }
}

const getUserData = async(req,res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-avatar,-passwordHash');

        if(!user){
            return userNotFound404(req,res);
        }

        const {passwordHash,...userData} = user._doc

        res.json(userData);
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}

const getUserAvatar = async(req,res) => {
    try {
        const fileId = req.params.id;
        const file = await userModel.findById(fileId);
  
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

const logout = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.param.id});

        if(!user){
            userNotFound404(req,res)
        }

        user.isLogged = false;

        res.json({
            message:"Logouted successfuly!"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signIn,
    signUp,
    getUserData,
    getUserAvatar,
    logout
}