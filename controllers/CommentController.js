// controllers/commentController.js

import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const createComment = async (req, res) => {
    try {
        const { text,user,postId } = req.body;

        const newComment = new CommentModel({
            text,
            user,
            post:postId
        });

        const savedComment = await newComment.save();

        await PostModel.findByIdAndUpdate(
            postId,
            { $push: { comments: savedComment._id } },
            { new: true }
        );

        res.json(savedComment);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Find the comment to get the post ID
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        const postId = comment.post; // Assuming you store the post ID in the comment document

        // Remove the comment from the post's comments array
        await PostModel.findByIdAndUpdate(postId, {
            $pull: { comments: commentId },
        });

        // Delete the comment
        await CommentModel.findByIdAndDelete(commentId);

        res.json({ message: 'Комментарий удален' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Не удалось удалить комментарий' });
    }
};