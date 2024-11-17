import crypto from "crypto"
import { configDotenv } from "dotenv"
configDotenv()
export default class EncryptUtils {
    constructor() {
        this.algorithm = 'aes-256-cbc'
        this.secret_key = process.env.SECRET_KEY
    }
    generate_buffer_bytes(length=0, passphrase="") {
        return crypto.scryptSync(passphrase, 'salt', length)
    }
    /**
     * encrypt text.
     * @param plain_text a text to encrypt.
     * @return the encrypted text.
    */
    symmetric_encrypt(plain_text="") {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(
            this.algorithm,
            Buffer.from(this.secret_key, 'hex'),
            iv
        )
        let encrypted = cipher.update(plain_text, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        const part1 = encrypted.slice(0, 17)
        const part2 = encrypted.slice(17)

        return `${part1}${iv.toString('hex')}${part2}`
    }
    /**
     * decrypt text.
     * @param encrypted_text the text to decrypt.
     * @return the decrypted text. 
    */
    symmetric_decrypt(encrypted_text="") {
        const ivPosition = {
            start: 17,
            end: 17 + 32
        }
        const iv = Buffer.from(encrypted_text.slice(ivPosition.start, ivPosition.end), 'hex')
        const part1 = encrypted_text.slice(0, ivPosition.start)
        const part2 = encrypted_text.slice(ivPosition.end)

        const compose_encrypted_text = `${part1}${part2}`
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            Buffer.from(this.secret_key, 'hex'),
            iv
        )
        let decrypted = decipher.update(compose_encrypted_text, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted

    }
    // TODO: implement static iv encrypt for the data that needs to be static:
    // - means data that encrypted always stays the same.
    // - this will be implemented for the user data.
}
const random_text = "c3239b314367060853f2bdcfb8c9af1c6f3a433f4b98f4b3401971a5261644c730c7b64f72f7926c1cd5d87e09eb1c5b4da50ba558feace6d995c6b4b533baf960a6c10f98eb8018097a8b3407c7c3e8"

const n = new EncryptUtils()
//const en = n.symmetric_encrypt("some random text to encrypt using iv in the text")
//console.log(en)
//const de = n.symmetric_decrypt(random_text)
//console.log(de)
//console.log(n.generate_buffer_bytes(32, process.env.PASSPHRASE).toString('hex'))
