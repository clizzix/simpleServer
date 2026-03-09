export type PostType = {
    id: string;
    title: string;
    content: string;
    author: string;
};

export type PostInputType = Omit<PostType, 'id'>;
