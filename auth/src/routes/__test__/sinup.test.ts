import request from "supertest";
import { app } from "../../app";
it("retuns a 201 on successful sinup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
});
