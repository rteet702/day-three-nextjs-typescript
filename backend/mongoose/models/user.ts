import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            trim: true,
        },
        posts: {
            type: [Schema.Types.ObjectId],
        },
    },
    { timestamps: true }
);

export default models.User || model("User", userSchema);
