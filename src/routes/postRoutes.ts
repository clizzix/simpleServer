import { Router } from 'express';
import {
    createPost,
    getPosts,
    getPostsById,
    deletePostById,
    updatePostById,
} from '#controllers';

const postRoutes = Router();

postRoutes.post('/', createPost);
postRoutes.get('/', getPosts);
postRoutes.get('/:id', getPostsById);
postRoutes.delete('/:id', deletePostById);
postRoutes.put('/:id', updatePostById);

export default postRoutes;
