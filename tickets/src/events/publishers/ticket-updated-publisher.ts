import { Publisher, Subjects, TicketUpdatedEvent } from "@mattlino/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
