import assert from 'assert'
import EncryptUtils from '../src/Utils/EncryptUtils.js'
const custom_cipher = new EncryptUtils()

const random_ecrypted_text = 'c3239b314367060853f2bdcfb8c9af1c6f3a433f4b98f4b3401971a5261644c730c7b64f72f7926c1cd5d87e09eb1c5b4da50ba558feace6d995c6b4b533baf960a6c10f98eb8018097a8b3407c7c3e8'

describe('Encrypt/Decrypt', function() {
    it('It should create the key and iv', function() {
        const n = custom_cipher.generate_buffer_bytes(32, process.env.PASSPHRASE)
        assert.equal(Object.keys(n).length, 2)
    })
    it('It should encrypt the data provided', function() {
        const s = 'some random text to encrypt using iv in the text'
        assert.notEqual(
            custom_cipher.symmetric_encrypt(s),
            'some random text to encrypt using iv in the text'
        )
    })
    it('It should decrypt the data provided', function() {
        assert.equal(
            custom_cipher.symmetric_decrypt(random_ecrypted_text),
            'some random text to encrypt using iv in the text'
        )
    })
})

// TODO: implement static iv encrypt for the data that needs to be static:
// - means data that encrypted always stays the same.
// - this will be implemented for the user data.

//console.log()
