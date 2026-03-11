import '#db';
import { Post } from '#models';
import type { PostInputType } from '#types';
import express from 'express';
import { postRoutes } from '#routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/posts', postRoutes);

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
);
