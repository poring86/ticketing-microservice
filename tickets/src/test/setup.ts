import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

let mongo: MongoMemoryServer;

declare global {
    var signin: () => Promise<string[]>;
}

beforeAll(async () => {
    process.env.JWT_KEY = "asdf";

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = mongo.getUri();
    mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;

    Object.values(collections).map(async (collection) => {
        await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    });
});

global.signin = async () => {
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({ email, password });
    expect(201);

    const cookie = response.get("Set-Cookie");

    return cookie;
};

// afterAll(async () => {
//     await mongo.stop();
//     await mongoose.connection.close();
// });
