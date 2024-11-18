import mysql2 from "mysql2"
import { Router } from "express"

import UserController from "../Controllers/UserController.js"

export default class UserRoute {
    router
    user_controller
    cursor
    constructor(cursor = mysql2.createConnection("")) {
        this.cursor = cursor
        this.user_controller = new UserController(cursor)
        this.router = Router()
    }
    get_users() {
        this.router.get("/all/:limit/:offset", 
            this.user_controller.get_users.bind(this.user_controller)
        )
    }
    get_user_by_id() {
        this.router.get("/by-id/:id_pk", 
            this.user_controller.get_user_by_id.bind(this.user_controller)
        )
    }
    get_user_by_alias() {
        this.router.get("/by-alias/:alias", 
            this.user_controller.get_user_by_alias.bind(this.user_controller)
        )
    }
    get_user_by_email() {
        this.router.get("/by-email/:email", 
            this.user_controller.get_user_by_email.bind(this.user_controller)
        )
    }
    post_user() {
        this.router.post("/post-user",
            this.user_controller.post_user.bind(this.user_controller)
        )
    }
    get routes() {
        this.get_users()
        this.get_user_by_id()
        this.get_user_by_alias()
        this.get_user_by_email()
        this.post_user()
        return this.router
    }
}
