import mysql2 from "mysql2"
import { Router } from "express"

import MessageRepository from "../Repositories/MessageRepository.js"

export default class MessageRoute {
    router
    message_repo
    constructor(cursor = mysql2.createConnection("")) {
        this.message_repo = new MessageRepository(cursor)
        this.router = Router()
    }

    get_messages() {
        this.router.get("/all/:limit/:offset")
    }

    get_message_by_id() {
        this.router.get("/by-id/:id_pk")
    }
    get_messages_by_user() {
        this.router.get("/by-user/:user_id_fk")
    }

    post_message() {
        this.router.post("/post-message")
    }

    get routes() {
        return this.router
    }
}
