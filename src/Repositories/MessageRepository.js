import mysql2 from "mysql2"

import QueryExecution from "../Utils/QueryExecution.js"
import QueryBuilder from "../Utils/QueryBuilder.js"

export default class MessageRepository {
    query_execution
    query_builder
    constructor(cursor = mysql2.createConnection("")) {
        this.query_execution = new QueryExecution(cursor)
        this.query_builder = new QueryBuilder("messages")
    }
    async select(model) {
        try {
            const {sql, values} = this.query_builder.select_query(model)
            return await this.query_execution.execute_sentence(sql, values)
        } catch(er) {
            console.error(er)
            return null
        }
    }
    async insert(model) {
        try {
            const {sql, values} = this.query_builder.select_query(model)
            return await this.query_execution.execute_sentence(sql, values)
        } catch(er) {
            console.error(er)
            return null
        }
    }
}
