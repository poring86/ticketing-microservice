import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import mongoose from "mongoose";

it("fetches the order", async () => {
    // Create ticket
    const ticketId = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        id: ticketId,
        title: "concert",
        price: 20,
    });

    await ticket.save();

    const user = global.signin();
    // Make a request to build an order with this ticket
    const { body: order } = await request(app)
        .post("/api/orders")
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    // Make request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(204);

    // Make request to fetch the order
    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits a order cancelled event");
