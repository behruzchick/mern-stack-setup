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
            email: req.body.email,
            passwordHash: hash
        })

        const isName = await userModel.findOne({name:req.body.name});
        const isEmail = await userModel.findOne({email:req.body.email});

        // if(isEmail){
        //     return emailArleadyUsed(req,res)
        // }

        if(req.body.password !== req.body.confirmpassword){
            return confirmpassword(req,res)
        }

        // if(isName){
        //     return nameArleadyUsed(req,res)
        // }

        if(!req.body.password){
            return enterPasswordError(req,res)
        }

        if (req.body.name.length <= 0) {
            return enterNameError(req,res)
        }
        if (req.body.email.length <= 0) {
            return  enterEmailError(req,res)
        }
        if (req.body.password.length <= 7) {
            return passwordLengthError(req,res)
        }


        if(await req.body.name === "admin" && await req.body.email === "admin@gmail.com" && req.body.password === "admin123"){
            doc.isAdmin = true
        }

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '20d'
            }
        );
        
        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        return internalServerError(req,res);
    }
}



const signIn = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return userNotFound404(req,res)
        }

        const pass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!pass) {
            return wrongPassword(req,res)
        }
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const { passwordHash, ...userData } = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        return internalServerError(req,res)
    }
}

module.exports = {
    signIn,
    signUp
}