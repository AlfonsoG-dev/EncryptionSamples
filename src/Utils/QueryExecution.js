import mysql2 from "mysql2"
export default class QueryExecution {
    cursor
    constructor(cursor = mysql2.createConnection("")) {
        this.cursor = cursor
    }

    execute_sentence(sql = "", values = []) {
        return new Promise((resolve, reject) => {
            this.cursor.execute(
                sql,
                values,
                (err, res) => {
                    if(err) reject(err)
                    resolve(res)
                }
            )
        })
    }

    query_sentence(sql = "", values = []) {
        return new Promise((resolve, reject) => {
            this.cursor.query(
                sql,
                values,
                (err, res) => {
                    if(err) reject(err)
                    resolve(res)
                }
            )
        })
    }
}
