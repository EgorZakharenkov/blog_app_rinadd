import PostModel from "../models/Post.js";
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user', 'fullName email').populate("comments") // Подгружаем информацию о пользователе
        res.json(posts);
    } catch (err) {
        res.status(404).json({
            message: "Не удалось вернуть все статьи"
        });
    }
};
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
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        )
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            })
            .exec();

        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(post);
    } catch (err) {
        res.status(404).json({
            message: 'Не удалось вернуть статью',
        });
    }
    };export const remove = async (req,res)=>{
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

