import request from "supertest";
import mongoose from "mongoose";
import { OrderStatus } from "@singtickets/common";

import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if the ticket doesn't exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({
            ticketId
        })
        .expect(404);
})

it("returns an error if the ticket is already reserved", async () => {
    const ticket = Ticket.build({
        title: "Concert",
        price: 29
    });

    await ticket.save();

    const order = Order.build({
        ticket,
        userId: "asfasfsafsa",
        status: OrderStatus.Created,
        expiresAt: new Date()
    });

    await order.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ ticketId: ticket.id })
        .expect(400)
})

it("reserves a ticket", async () => {
    const ticket = Ticket.build({
        title: "Concert",
        price: 29
    });

    await ticket.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ ticketId: ticket.id })
        .expect(201)
})

it.todo("emits an order created event")