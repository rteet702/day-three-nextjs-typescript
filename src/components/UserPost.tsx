import { NextPage } from "next";
import { ObjectId } from "mongoose";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

type Post = {
    _id: string;
    author: string;
    content: string;
    createdAt: Date;
};

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    posts: ObjectId[];
};

interface Props {
    post: Post;
}

const UserPost: NextPage<Props> = (props) => {
    const { post } = props;
    const [user, setUser] = useState<User>();

    const { localDate, localTime } = getDateStrings(post);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/${post.author}`)
            .then((user) => {
                setUser(user.data.user);
            });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[500px] text-neutral-50 shadow-xl">
            <div className="px-4 py-2 bg-neutral-800 rounded-t-lg flex justify-between">
                <p>{user.name}</p>
                <button
                    onClick={() => deleteHandler(post)}
                    className="bg-transparent hover:bg-red-500 rounded-lg px-3 transition-colors"
                >
                    Delete
                </button>
            </div>
            <p className="px-4 py-4 bg-neutral-700">{post.content}</p>
            <p className="px-4 py-2 bg-neutral-800 rounded-b-lg">
                {localDate} @ {localTime}
            </p>
        </div>
    );
};

const getDateStrings = (post: Post) => {
    const date = new Date(post.createdAt);
    const localDate = date.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const localTime = date.toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    });

    return { localDate, localTime };
};

const deleteHandler = (post: Post) => {
    axios
        .delete(`http://localhost:3000/api/posts/${post._id}`)
        .then(() => {
            Router.replace(Router.asPath);
        })
        .catch((error) => {
            console.log(error);
        });
};

export default UserPost;
