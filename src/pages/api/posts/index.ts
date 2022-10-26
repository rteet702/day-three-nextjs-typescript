import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@backend/mongoose/models/post";
import connectToMongo from "@backend/mongoose/mongoose";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    // GET REQUEST
    if (request.method === "GET") {
        await connectToMongo();
        await Post.find({})
            .sort({ createdAt: -1 })
            .then((posts) => {
                response.status(200).json({
                    posts,
                });
            })
            .catch((error) => {
                response.status(400).json({
                    error,
                });
            });
    }
    // POST REQUEST
    else if (request.method === "POST") {
        await connectToMongo();
        await Post.create(request.body)
            .then((post) => {
                response.status(200).json({
                    post,
                });
            })
            .catch((error) => {
                response.status(400).json({
                    error,
                });
            });
    }
    // CATCHALL
    else {
        response.status(400).json({
            message: `Unable to use method ${request.method} at this endpoint.`,
        });
    }
};

export default handler;
