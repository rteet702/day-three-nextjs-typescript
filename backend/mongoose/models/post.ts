import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: [true, "Please enter a body for your post!"],
            minlength: [3, "Post must be at least 3 characters."],
            trim: true,
        },
    },
    { timestamps: true }
);

export default models.Post || model("Post", postSchema);
