import crypto from "crypto"
import { configDotenv } from "dotenv"
configDotenv()
export default class EncryptUtils {
    constructor() {
        this.iv = process.env.IV
        this.algorithm = 'aes-256-cbc'
        this.secret_key = process.env.SECRET_KEY
    }
    generate_buffer_bytes(length=0, passphrase="") {
        const m_key = crypto.scryptSync(passphrase, 'salt', length)
        const m_iv = crypto.randomBytes(16)
        return {
            key: m_key.toString('hex'),
            iv: m_iv.toString('hex')
        }
    }
    static_iv_encrypt(plain_text="") {
        const c = crypto.createCipheriv(
            this.algorithm,
            Buffer.from(this.secret_key, 'hex'),
            Buffer.from(this.iv, 'hex')
        )
        let encrypted = c.update(plain_text, 'utf8', 'hex')
        encrypted += c.final('hex')
        return encrypted
    }
    /**
     * encrypt text.
     * @param plain_text a text to encrypt.
     * @return the encrypted text.
    */
    dynamic_iv_encrypt(plain_text="") {
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
    static_iv_decrypt(encrypted_text="") {
        const d = crypto.createDecipheriv(
            this.algorithm,
            Buffer.from(this.secret_key, 'hex'),
            Buffer.from(this.iv, 'hex')
        )
        let decrypted = d.update(encrypted_text, 'hex', 'utf8')
        decrypted += d.final('utf8')
        return decrypted
    }
    /**
     * decrypt text.
     * @param encrypted_text the text to decrypt.
     * @return the decrypted text. 
    */
    dynamic_iv_decrypt(encrypted_text="") {
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

