// import {Publisher} from '../../../../nats-test/src/events/base-publisher'
// import { Subjects } from '../../../../nats-test/src/events/subjects'
// import {TicketCreatedEvent} from '../../../../nats-test/src/events/ticket-created-event'

import { Publisher } from "../../../../common/src/events/base-publisher"
import { Subjects } from "../../../../common/src/events/subjects"
import { TicketCreatedEvent } from '../../../../common/src/events/ticket-created-event'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: TicketCreatedEvent['subject']=Subjects.TicketCreated
}