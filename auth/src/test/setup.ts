import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "asdf";

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = await mongo.getUri();
    mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;

    Object.values(collections).map(async (collection) => {
        await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    });
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});
