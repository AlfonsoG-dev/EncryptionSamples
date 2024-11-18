# Encryption test & samples
- This project server as a template for the encryption applications in a WEB API.
- The server will be executing simple encryption/decryption of text messages.

# Dependencies
- [node_20.18.0](https://nodejs.org/en/download/package-manager)
- [mysql_server_8.0.34](https://dev.mysql.com/downloads/)

# References
- [asymmetric_encryption](https://medium.com/@makenoizee/secure-data-transmission-with-node-js-and-asymmetric-encryption-20b2d80aa871)
- [symmetric_encryption](https://dev.to/superviz/implementing-symmetric-and-asymmetric-encryption-with-nodejs-4efp)
- [about asymmetric encryption](https://www.cloudflare.com/es-es/learning/ssl/what-is-asymmetric-encryption/)
- [node_documentation](https://nodejs.org/docs/latest/api/)
- [mysql_CLI_docummentation](https://dev.mysql.com/doc/refman/8.4/en/mysql.html)
- [mocha_testing_documentation](https://mochajs.org/#getting-started)
- [assert_documentation](https://www.w3schools.com/nodejs/ref_assert.asp)

----

# Install Instructions
1. Clone the project in your machine.
```shell
git clone https://github.com/AlfonsoG-dev/encryptionSamplesAPI
```
2. Install **node** dependencies.
```shell
npm i
```
3. Configure **database** by  creating the connection file and class using the following example.
```js
import mysql2 from "mysql2"
import { configDotenv } from "dotenv"
configDotenv()
export default class DBConfig {
    db_name
    constructor(db_name = "") {
        this.db_name = db_name
    }

    get config() {
        return {
            host: "localhost",
            port: "3306",
            user: "test_user",
            password: process.env.DB_PASSWORD,
            database: this.db_name
        }
    }
    get cursor() {
        return mysql2.createConnection(this.config)
    }
}
```
> for the database you will find a script to build the tables in the **SQL** folder.
>- you only need to source it in the **mysql server CLI**.
```shell
cd ./sql/
mysql -u root -p
mysql > source script.sql;
```
4. Create the environment variables.
```env
NODE_ENV='development' -- if you want to test locally otherwise use **production**
DB_PASSWORD=#database password
API_PORT='3000' --port for the server
API_HOST='127.0.0.1' -- IP also you can use **localhost**
PASSPHRASE=#secure phrase for secret key generation
SECRET_KEY=#use the encrypt methods to generate
IV=#use the encrypt methods to generate
```

# Usage instructions
1. Create a user for the API.
2. Run the API.
```shell
npm start
```
3. Make **HTTP** requests to the API **end-points**.
> the server is running in the port: **3000**
```http
GET http://localhost:3000/
```
4. Execute test.
```shell
npm run test
```
-----
# Disclaimer
- This project its for educational purposes.
- Security issues are not taken into account.
- Use at your own risk.
