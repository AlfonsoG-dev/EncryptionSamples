import assert from "assert"
export default class QueryBuilder {
    tb_name
    constructor(tb_name) {
        this.tb_name = tb_name
    }
    select_query(model) {
        const keys = Object.keys(model)
        assert.notEqual(keys.length, 0)
        let where_clause = ""
        let values = []

        for(let k of keys) {
            if(model[k] !== null) {
                where_clause += `${k}=? AND`
                values.push(model[k])
            }
        }
        assert.notEqual(where_clause.length, 4)
        where_clause = where_clause.substring(0, where_clause.length-4)
        return {
            sql: `SELECT * FROM ${this.tb_name} WHERE ${where_clause}`,
            values: values
        }
    }
    /**
     * builder method for insert sentences.
     * @param model the request object with the stract data.
     * @returns the sql sentence & the query prepared values.
    */
    insert_query(model) {
        const keys = Object.keys(model)
        let where_values = []
        let where_names = []
        let values = []

        for(let k of keys) {
            if(model[k] !== null) {
                where_values.push("?")
                where_names.push(k)
                values.push(model[k])
            }
        }

        return {
            sql: `INSERT INTO ${this.tb_name} (${where_names.join(', ')}) VALUES (${where_values.join(', ')})`,
            values: values
        }
    }

    /**
     * builder method for update sentences.
     * @param model the object with the request object to stract the data.
     * @param where_values values for the where clause. 
    */
    update_query(model, where_values=[]) {
        const keys = Object.keys(model)
        let set_clause = []
        let where_clause = where_values
        let values = []
        let condition = ""

        for (let k of keys) {
            if (!where_clause.includes(k)) {
                set_clause.push(`${k}=?`)
                values.push(model[k])
            }
        }
        for(let i of where_clause) {
            values.push(model[i])
            condition += i + "=? AND "
        }
        condition = condition.substring(0, condition.length-5)

        return {
            sql: `UPDATE ${this.tb_name} SET ${set_clause.join(', ')} WHERE ${condition}`,
            values: values
        }
    }
}
