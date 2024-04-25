import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  commentText: string;
  author: string;
}

const CommentSchema: Schema = new Schema({
  commentText: { type: String, required: true },
  author: { type: String, required: true },
});

interface IPost extends Document {
  postText: string;
  author: string;
  comments: IComment[];
}

const PostSchema: Schema = new Schema({
  postText: { type: String, required: true },
  author: { type: String, required: true },
  comments: { type: [CommentSchema], required: false },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;