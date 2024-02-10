const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const port = process.env.PORT || 5000
const {auth} = require('./checkAuth')
const {signIn,signUp} = require('./controllers/authController')
const {YoureModel} = require('./models/YoureCard');
const { createPost, getAllPosts } = require('./controllers/PostController');
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({
      message: "Hello world!"
    })
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/post', upload.single('file'),createPost);

app.get('/image/:id', async (req, res) => {
  try {
      const fileId = req.params.id;
      const file = await YoureModel.findById(fileId);

      if (!file) {
          return res.status(404).json({ message: 'File not found' });
      }

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(file.img.data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving image' });
  }
});


app.post('/auth/register',signUp);
app.post('/auth/login',signIn);
app.get('/posts',getAllPosts);

app.listen(port, () => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/yourCollection?retryWrites=true&w=majority",{
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