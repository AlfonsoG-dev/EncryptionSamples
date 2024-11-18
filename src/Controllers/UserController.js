import mysql2 from "mysql2"
import assert from "assert"

import UserRepository from "../Repositories/UserRepository.js"
import CipherObjects from "../Utils/CipherObjects.js"

export default class UserController {
    user_repo
    global_cipher
    constructor(cursor = mysql2.createConnection("")) {
        this.user_repo = new UserRepository(cursor)
        this.global_cipher = new CipherObjects()
    }

    async get_users(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.user_repo.select_all(data_req)
            if(data_res.length === 0) {
                return res.json({error: "Empty set"})
            }
            return res.status(200).json(this.global_cipher.get_static_iv_decrypt_model(data_res))
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get all users"})
        }
    }
    async get_user_by_id(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.user_repo.select(data_req)
            if(data_res.length === 0) {
                return res.json({error: "Not found"})
            }
            return res.status(200).json(this.global_cipher.get_static_iv_decrypt_model(data_res))
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get user by id"})
        }
    }
    async get_user_by_alias(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.user_repo.select(
                this.global_cipher.get_static_iv_encrypt_model(data_req)
            )
            if(data_res.length === 0) {
                return res.json({error: "Not found"})
            }
            return res.status(200).json(this.global_cipher.get_static_iv_decrypt_model(data_res))
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get user by alias"})
        }
    }
    async get_user_by_email(req, res) {
        try {
            const data_req = req.params
            assert.notEqual(Object.keys(data_req).length, 0)
            const data_res = await this.user_repo.select(
                this.global_cipher.get_static_iv_encrypt_model(data_req)
            )
            if(data_res.length === 0) {
                return res.json({error: "Not fount"})
            }
            return res.status(200).json(this.global_cipher.get_static_iv_decrypt_model(data_res))
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to get user by email"})
        }
    }
    async post_user(req, res) {
        try {
            const data_req = req.body
            assert.notEqual(data_req, undefined)
            const data_res = await this.user_repo.insert(
                this.global_cipher.get_static_iv_encrypt_model(data_req)
            )
            if(data_res.affectedRows === 0) {
                return res.status(409).json({error: "Cannot insert user"})
            }
            return res.status(200).json({msg: "User has been inserted"})
        } catch(er) {
            console.error(er)
            return res.status(400).json({error: "[Error] while trying to insert user"})
        }
    }
}
