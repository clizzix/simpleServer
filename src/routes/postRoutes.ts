import { Router } from 'express';
import { createPost, getPosts } from '#controllers/posts';

const postRoutes = Router();

postRoutes.post('/', createPost);
postRoutes.get('/', getPosts);

export default postRoutes;
