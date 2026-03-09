import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
    {
        id: { type: String },
        title: { type: String, required: [true, 'Title required!'] },
        content: { type: String, required: [true, 'Message is required'] },
        author: { type: String, required: [true, 'Author name is required'] },
    },
    {
        timestamps: true,
    },
);

export default model('Post', PostSchema);
