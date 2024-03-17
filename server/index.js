const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const port = process.env.PORT || 5000
const {auth} = require('./checkAuth')
const {signIn,signUp, getUserData, logout} = require('./controllers/authController')
const {PostModel} = require('./models/Post');
const { createPost, getAllPosts, getPostImage, getPost } = require('./controllers/PostController');
const { userModel } = require('./models/User');
const cookies = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookies());


app.get('/', (req,res) => {
    res.json({
      message: "Hello world!"
    })
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/post/:id', upload.single('file'),createPost);
app.get('/image/:id',getPostImage);
app.get('/avatar/:id',getPostImage);
app.post('/auth/register',signUp);
app.post('/auth/login',signIn);
app.get('/auth/getUser/:id',getUserData);
app.get('/posts',getAllPosts);
app.get('/getPost/:id',getPost);
app.post('/logout/:id',logout);

app.listen(port, () => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/blog?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfuly connected to database");
    }).catch((e) => {
        console.log(e);
    })
    console.log(`http://localhost:${port}`);
})