import { Publisher, PaymentCreatedEvent, Subjects } from "@mattlino/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}
