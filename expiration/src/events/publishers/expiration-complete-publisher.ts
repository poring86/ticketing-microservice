import { Publisher, ExpirationCompleteEvent, Subjects } from "@mattlino/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
