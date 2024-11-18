import mysql2 from "mysql2"
import assert from "assert"

import MessageRepository from "../Repositories/MessageRepository.js"
import CipherObjects from "../Utils/CipherObjects.js"

export default class MessageController {
    message_repo
    global_cipher
    constructor(cursor = mysql2.createConnection("")) {
        this.message_repo = new MessageRepository(cursor)
        this.global_cipher = new CipherObjects()
    }
    async get_all(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.message_repo.select(data_req)
            if(data_res.length === 0) {
                return res.json({error: "Empty set"})
            }
            return res.status(200).json(
                this.global_cipher.dynamic_iv_decrypt_model_data(data_res)
            )
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get all messages"})
        }
    }
    async get_message_by_id(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.message_repo.select(data_req)
            if(data_res.length === 0) {
                return res.json({error: "Not found"})
            }
            return res.status(200).json(
                this.global_cipher.dynamic_iv_decrypt_model_data(data_res)
            )
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get message by id_pk"})
        }
    }
    async get_messages_by_user(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = this.message_repo.select(data_req)
            if(data_res.length === 0) {
                return res.json({error: "Not found"})
            }
            return res.status(200).json(
                this.global_cipher.dynamic_iv_decrypt_model_data(data_res)
            )
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get messages by user"})
        }
    }
    async post_message(req, res) {
        try {
            const data_req = req.body
            assert.notEqual(data_req, undefined)
            const data_res = await this.message_repo.insert(
                this.global_cipher.dynamic_iv_encrypt_model_data(data_req)
            )
            if(data_res.affectedRows === 0) {
                return res.status(409).json({error: "Cannot insert message"})
            }
            return res.status(200).json({msg: "Message has been inserted"})
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to insert message"})
        }
    }
}
