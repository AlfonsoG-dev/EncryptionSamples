import mysql2 from "mysql2"
import { Router } from "express"

export default class UserRoute {
    router
    cursor
    constructor(cursor = mysql2.createConnection("")) {
        this.cursor = cursor
        this.router = Router()
    }
    get_users() {
        this.router.get("/all/:limit/:offset", (req, res) => {
            res.send("Not implemented yet")
        })
    }
    get_user_by_id() {
        this.router.get("/by-id", (req, res) => {
            res.send("Not implemented yet")
        })
    }
    get_user_by_alias() {
        this.router.get("/by-alias", (req, res) => {
            res.send("Not implemented yet")
        })
    }
    get_user_by_email() {
        this.router.get("/by-email", (req, res) => {
            res.send("Not implemented yet")
        })
    }
    post_user() {
        this.router.post("/post-user", (req, res) => {
            res.send("Not implemented yet")
        })
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
