import { Publisher, Subjects, OrderCancelledEvent } from "@mattlino/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
