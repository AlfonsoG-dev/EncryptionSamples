import mysql2 from "mysql2"
import { Router } from "express"

import MessageController from "../Controllers/MessageController.js"

export default class MessageRoute {
    router
    message_controller
    constructor(cursor = mysql2.createConnection("")) {
        this.router = Router()
        this.message_controller = new MessageController(cursor)
    }

    get_messages() {
        this.router.get("/all/:limit/:offset", 
            this.message_controller.get_all.bind(this.message_controller)
        )
    }

    get_message_by_id() {
        this.router.get("/by-id/:id_pk", 
            this.message_controller.get_message_by_id.bind(this.message_controller)
        )
    }
    get_messages_by_user() {
        this.router.get("/by-user/:user_id_fk",
            this.message_controller.get_messages_by_user.bind(this.message_controller)
        )
    }

    post_message() {
        this.router.post("/post-message",
            this.message_controller.post_message.bind(this.message_controller)
        )
    }

    get routes() {
        this.get_messages()
        this.get_message_by_id()
        this.get_messages_by_user()
        this.post_message()
        return this.router
    }
}
