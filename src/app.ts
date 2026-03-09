import '#db';
import { Post } from '#models';
import type { PostInputType } from '#types';
import http, {
    type RequestListener,
    type IncomingMessage,
    type ServerResponse,
} from 'node:http';
import { after } from 'node:test';

const createResponse = (
    res: ServerResponse,
    statusCode: number,
    message: unknown,
) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    return res.end(
        typeof message === 'string'
            ? JSON.stringify({ message })
            : JSON.stringify(message),
    );
};

const parseJsonBody = <T>(req: IncomingMessage): Promise<T> => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body) as T);
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
    });
};

const requestHandler: RequestListener = async (req, res) => {
    const singlePostRegex = /^\/posts\/[0-9a-zA-Z]+$/;
    const { method, url } = req;
    if (url === '/posts') {
        if (method === 'GET') {
            try {
                const allPosts = await Post.find();
                return createResponse(res, 200, allPosts);
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.message === 'Database error'
                ) {
                    return createResponse(res, 500, { message: error.message });
                }
                return createResponse(res, 400, { error });
            }
        }
        if (method === 'POST') {
            try {
                const body = await parseJsonBody<PostInputType>(req);
                const newPost = await Post.create(body);
                return createResponse(res, 201, newPost);
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.message === 'Invalid JSON'
                ) {
                    return createResponse(res, 400, { message: error.message });
                }
                return createResponse(res, 400, { error });
            }
        }
        return createResponse(res, 405, 'Method Not Allowed');
    }
    if (singlePostRegex.test(url!)) {
        const id = url!.split('/')[2];

        if (method === 'GET') {
            try {
                const post = await Post.findById(id);
                if (!post)
                    return createResponse(res, 404, {
                        message: 'Post nicht gefunden',
                    });
                return createResponse(res, 200, post);
            } catch (error) {
                return createResponse(res, 400, {
                    message: 'Invalid ID-Format',
                });
            }
        }
        if (method === 'PUT') {
            try {
                const body = await parseJsonBody<Partial<PostInputType>>(req);
                const updatedPost = await Post.findByIdAndUpdate(id, body, {
                    returnDocument: 'after',
                });
                if (!updatedPost)
                    return createResponse(res, 404, {
                        message: 'Post not found',
                    });
                return createResponse(res, 200, updatedPost);
            } catch (error) {
                return createResponse(res, 400, {
                    message: 'Failed to update post',
                });
            }
        }
        if (method === 'DELETE') {
            try {
                const deletedPost = await Post.findByIdAndDelete(id);
                if (!deletedPost)
                    return createResponse(res, 404, {
                        message: 'Post not found',
                    });
                return createResponse(res, 200, `DELETE request on ${url}`);
            } catch (error) {
                return createResponse(res, 400, {
                    message: 'Failed to delete',
                });
            }
        }
        return createResponse(res, 405, 'Mehod Not Allowed');
    }
    return createResponse(res, 404, 'Not Found');
};

const server = http.createServer(requestHandler);

const port = 3000;
server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`),
);
