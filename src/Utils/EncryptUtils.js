import crypto from "crypto"
import { configDotenv } from "dotenv"
configDotenv()
export default class EncryptUtils {
    constructor() {
        this.algorithm = 'aes-256-cbc'
        this.secret_key = process.env.SECRET_KEY
    }
    generate_buffer_bytes(length=0) {
        return crypto.randomBytes(length)
    }
    /**
     * encrypt text.
     * @param plain_text a text to encrypt.
     * @return the encrypted text.
    */
    test_encrypt(plain_text="") {
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
    test_decrypt(encrypted_text="") {
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
}
const random_text = "147c8ec462c5c2fc6b817148bbbd8a40008f8d968f64b97ab99d32029a9cdbd5f7d3df3e83e8c2eefdf7ddc92fe328fbbc65e30256558779d5f333f8e0698e4437c1847b872c02d734e9d305449991ec"

const n = new EncryptUtils()
//const en = n.test_encrypt("some random text to encrypt using iv in the text")
const de = n.test_decrypt(random_text)
//console.log(n.generate_buffer_bytes(32).toString('hex'))
console.log({
    de
})
