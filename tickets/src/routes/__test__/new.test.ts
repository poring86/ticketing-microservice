import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

jest.mock("../../nats-wrapper");

it("has a route handler listening to /api/tickets for a post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({})
        .expect(401);

    expect(response.status).toEqual(401);
});

it("return a status other than 401 if the user is signed in", async () => {
    console.log("global.signin()", global.signin());
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({});

    console.log("response.status", response.status);

    expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "",
            price: 10,
        });

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});

it("returns an error if an invalid price in provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "dq3dq3d",
            price: -10,
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "dq3dq3d",
        })
        .expect(400);
});

it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({});

    expect(tickets.length).toEqual(0);

    const title = "f4wfw4f";

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});

it("expect event to been published", async () => {
    const title = "f4wfw4f";

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
