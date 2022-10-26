import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import User from "@backend/mongoose/models/user";
import connectToMongo from "@backend/mongoose/mongoose";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    // GET REQUEST
    if (request.method === "GET") {
        await connectToMongo();
        await User.find({})
            .then((users) => {
                response.status(200).json({
                    users,
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
        const { name, email, password } = request.body;
        const pwHash = await hash(password, 10);
        await connectToMongo();
        await User.create({
            name,
            email,
            password: pwHash,
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
    // CATCHALL FOR INCORRECT REQUESTS
    else {
        response.status(400).json({
            message: `Unable to use method ${request.method} at this endpoint.`,
        });
    }
};

export default handler;
