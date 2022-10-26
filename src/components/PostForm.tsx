import { NextPage } from "next";
import { ObjectId } from "mongoose";
import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    posts: ObjectId[];
    map: CallableFunction;
};

const PostForm: NextPage = () => {
    const [users, setUsers] = useState<User>();
    const selectedAuthor = useRef<HTMLSelectElement>(null);
    const textValue = useRef<null | HTMLTextAreaElement>(null);

    const router = useRouter();

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/users")
            .then((allUsers) => setUsers(allUsers.data.users))
            .catch((error) => console.log(error));
    }, []);

    if (!users) {
        return <div>Loading...</div>;
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (selectedAuthor.current && textValue.current) {
            axios
                .post("http://localhost:3000/api/posts", {
                    author: selectedAuthor.current.value,
                    content: textValue.current.value,
                })
                .then(() => {
                    router.replace(router.asPath);
                    textValue.current ? (textValue.current.value = "") : null;
                })
                .catch((error) => {
                    console.log("Error!", error);
                });
        }
    };

    return (
        <form className="w-[600px] mx-auto flex flex-col m-8">
            <select
                name="author"
                className="bg-neutral-800 py-4 border-none outline-none"
                ref={selectedAuthor}
            >
                {users.map((user: User, index: number) => {
                    return (
                        <option key={index} value={user._id}>
                            {user.name}
                        </option>
                    );
                })}
            </select>
            <textarea
                name="content"
                rows={10}
                className="bg-neutral-800 p-5 focus:outline-0"
                placeholder="What's on your mind?"
                style={{ resize: "none" }}
                ref={textValue}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        console.log(e);
                        submitHandler(e);
                    }
                }}
            ></textarea>
        </form>
    );
};

export default PostForm;
