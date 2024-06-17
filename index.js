import express  from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import {registerValidator,loginValidator,postCreateValidation} from "./validations/auth.js";
import {checkAuth, handleErrors} from "./utlis/index.js";
import {PostController,UserController,CommentController} from "./controllers/index.js"
import cors from "cors"
const app = express()

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads')
    },
    filename:(_,file,cb)=>{
        cb(null,file.originalname)
    },
})
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))

const upload = multer({storage})



mongoose.connect("mongodb+srv://admin:wwwwww@cluster0.byatrwz.mongodb.net/blog?retryWrites=true&w=majority",
    ).then(()=>{
        console.log("db ok....")
}).catch((err)=>{
    console.log('db no')
})



app.listen(4444||process.env.PORT,(err)=>{
    if(err){
        return console.log(err)
    }
    else{
        console.log('Server ok')
    }
})

app.get('/',(req,res)=>{
    res.send("Сервер запустился")
})

app.post('/auth/login',loginValidator,handleErrors,UserController.login)

app.post('/auth/register',registerValidator, handleErrors ,UserController.register)

app.get('/auth/me',checkAuth ,UserController.getMe)

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
      res.json({
          url:`/uploads/${req.file.originalname}`
      })
})

app.post('/posts',checkAuth, postCreateValidation ,handleErrors,PostController.createPost)

app.get('/posts',PostController.getAll)
app.get('/posts/:id',PostController.getOne)
app.delete('/posts/:id',checkAuth ,PostController.remove)
app.patch('/posts/:id',checkAuth ,postCreateValidation,handleErrors,PostController.update)


app.post("/comment",CommentController.createComment)

app.delete("/comment/:id",CommentController.deleteComment)







