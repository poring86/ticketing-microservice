import { Publisher, OrderCreatedEvent, Subjects } from "@mattlino/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
