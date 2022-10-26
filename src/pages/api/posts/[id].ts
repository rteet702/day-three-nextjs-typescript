import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@backend/mongoose/models/post";
import connectToMongo from "@backend/mongoose/mongoose";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    // GET REQUEST
    if (request.method === "GET") {
        const { id } = request.query;
        await connectToMongo();
        await Post.findById(id)
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
    // DELETE REQUEST
    else if (request.method === "DELETE") {
        const { id } = request.query;
        await connectToMongo();
        await Post.findByIdAndDelete(id)
            .then((post) => {
                response.status(200).json({
                    message: "Post Deleted",
                    post,
                });
            })
            .catch((error) => {
                response.status(400).json({ error });
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
