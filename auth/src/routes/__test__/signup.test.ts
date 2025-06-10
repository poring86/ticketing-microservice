import request from "supertest";
import { app } from "../../app";

it("retuns a 201 on successful sinup", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
});

it("returns a 400 with an invalid email", async () => {
    await request(app).post("/api/users/sinup").send({
        email: "fwefwed",
        password: "password",
    });
});

it("returns a 400 with an invalid password", async () => {
    await request(app).post("/api/users/sinup").send({
        email: "test@test.com",
        password: "p",
    });
});

it("returns a 400 with missing email and password", async () => {
    await request(app).post("/api/users/sinup").send({
        email: "test@test.com",
    });
    await request(app).post("/api/users/sinup").send({
        password: "password",
    });
});

it("disallows duplicate emails", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});

it("sets a cookie after a successful sinup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
});
