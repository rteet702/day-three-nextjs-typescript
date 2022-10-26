import mongoose from "mongoose";

const MONGODB = "test-db";

const connectToMongo = async () => {
    mongoose.connect(`mongodb://127.0.0.1/${MONGODB}`, () => {
        console.log(`Connected to MongoDB database: ${MONGODB}`);
    });
};

export default connectToMongo;
