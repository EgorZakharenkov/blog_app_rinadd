import PostModel from "../models/Post.js";
export const getAll = async (req,res)=>{
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    }catch (err){
        res.status(404).json({
            message:"Не удалось вернуть все статьи"
        })
    }
}
export const createPost = async (req,res)=>{
    try{
        const doc = new PostModel({
            name:req.body.name,
            description:req.body.description,
            animeURL:req.body.animeURL,
            look:req.body.look,
            user:req.userId
        })
        const post = await doc.save()
        res.json(post)
    }
    catch (err){
        return res.status(404).json({
            message:"не удалось"
        })
    }

}
export const getOne = async (req,res)=>{
    try {
       const postId = req.params.id;
       PostModel.findOneAndUpdate(
           {
           _id:postId
       },
           {
           $inc:{viewsCount:1}
       },
           {
               returnDocument:'after'
           },
           (err,doc)=>{
               if(err){
                   return res.status(404).json({
                       message:"Не удалось"
                   })
               }
               if(!doc){
                   return res.status(404).json({
                       message:"Статься не найдена"
                   })
               }
               res.json(doc)
           }

           ).populate('user')


    }catch (err){
        res.status(404).json({
            message:"Не удалось вернуть статью"
        })
    }

}
export const remove = async (req,res)=>{
   try {
       const postId = req.params.id;
       PostModel.findOneAndDelete({
           _id:postId
       },
           (err,doc)=>{
           if(err){
               return res.status(404).json({
                   message:"Не удалось удалить документ"
               })
           }
           if(!doc){
               return res.status(404).json({
                   message:"Такого поста не сущестует"
               })
           }
           res.json({
               message:"Успешно"
           })
           })
   }catch (err){

   }
}
export const update = async (req,res)=>{
    try{
        const postId = req.params.id;
        await PostModel.updateOne({
            _id:postId,
        },{
            name:req.body.name,
            description:req.body.description,
            animeURL:req.body.animeURL,
            look:req.body.look,
            user:req.userId
        })

        res.json({
            message:"Успешно обновлено"
        })
    }catch (err){
        res.status(404).json({
            message:"не удалось обновить статью"
        })
    }
}

