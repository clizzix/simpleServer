import { Router } from 'express';
import { createPost, getPosts } from '#controllers';

const postRoutes = Router();

postRoutes.post('/', createPost);
postRoutes.get('/', getPosts);

export default postRoutes;
