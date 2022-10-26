import type { NextApiRequest, NextApiResponse } from "next";
import User from "@backend/mongoose/models/user";
import connectToMongo from "@backend/mongoose/mongoose";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    // GET REQUEST
    if (request.method === "GET") {
        const { id } = request.query;
        await connectToMongo();
        await User.findById(id)
            .then((user) => {
                response.status(200).json({
                    user,
                });
            })
            .catch((error) => {
                response.status(400).json({
                    error,
                });
            });
    }
    // PUT REQUEST
    else if (request.method === "PUT") {
        const { id } = request.query;
        await connectToMongo();
        await User.findByIdAndUpdate(id, request.body, {
            returnOriginal: false,
        })
            .then((user) => {
                response.status(200).json({
                    user,
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
        await User.findByIdAndRemove(id)
            .then((ran) => {
                response.status(200).json({
                    message: `User: ${id} deleted.`,
                    extra: ran,
                });
            })
            .catch((error) => {
                response.status(400).json({
                    error,
                });
            });
    }
    // CATCHALL FOR INCORRECT REQUESTS
    else {
        response.status(400).json({
            message: `Unable to use method ${request.method} at this endpoint.`,
        });
    }
};

export default handler;
