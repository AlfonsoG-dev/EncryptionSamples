import mysql2 from "mysql2"

import QueryExecution from "../Utils/QueryExecution.js"
import QueryBuilder from "../Utils/QueryBuilder.js"
export default class UserRepository {
    query_execution
    query_builder
    constructor(cursor = mysql2.createConnection("")) {
        this.query_execution = new QueryExecution(cursor)
        this.query_builder = new QueryBuilder("users")
    }

    async select_all({limit, offset}) {
        try {
            const sql = "SELECT * FROM users LIMIT ? OFFSET ?"
            return await this.query_execution.execute_sentence(sql, [limit, offset])
        } catch(er) {
            console.error(er)
            return null
        }
    }
    async select(user) {
        try {
            const {sql, values} = this.query_builder.select_query(user)
            return await this.query_execution.execute_sentence(sql, values)
        } catch(er) {
            console.error(er)
            return null
        }
    }
    async insert(user) {
        try {
            const {sql, values} = this.query_builder.insert_query(user)
            return await this.query_execution.execute_sentence(sql, values)
        } catch(er) {
            console.error(er)
            return null
        }
    }

}
