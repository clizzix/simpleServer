import type { RequestHandler } from 'express';
import { Post } from '#models';

export const createPost: RequestHandler = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'failed to create post' });
    }
};

export const getPosts: RequestHandler = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'failed to fetch posts' });
    }
};

export const getPostsById: RequestHandler = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch post' });
    }
};

export const updatePostById: RequestHandler = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true,
        });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to update post' });
    }
};

export const deletePostById: RequestHandler = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.json({
            message: `Successfully deleted post with the Id: ${post.id}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'failed to delete post' });
    }
};
