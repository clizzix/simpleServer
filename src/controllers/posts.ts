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
