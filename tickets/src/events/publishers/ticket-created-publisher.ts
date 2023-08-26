import { Publisher, Subjects, TicketCreatedEvent } from "@singtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated
}