import axios from "axios";
import { InferGetServerSidePropsType, NextPage } from "next";
import UserPost from "../components/UserPost";
import PostForm from "../components/PostForm";

type Post = {
    _id: string;
    author: string;
    content: string;
    createdAt: Date;
};

const Index = ({
    posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className="w-screen h-screen text-neutral-50">
            {/* Create Post Form */}
            <PostForm />
            {/* Post Feed */}
            <div className="h-screen flex flex-col items-center gap-10">
                {posts &&
                    posts.map((post: Post, index: number) => {
                        return <UserPost post={post} key={index} />;
                    })}
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const postResponse = await axios.get("http://127.0.0.1:3000/api/posts");
    const posts = postResponse.data.posts;
    return {
        props: {
            posts,
        },
    };
}

export default Index;
