import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,
            unique:true
        },
        animeURL:String,
        viewsCount:{
            type:Number,
            default:0
        },
        look:Boolean


        ,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },

    },
    {
        timestamps:true
    },

)

export default mongoose.model('Post',PostSchema)