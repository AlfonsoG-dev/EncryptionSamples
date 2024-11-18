import assert from 'assert'
import EncryptUtils from '../src/Utils/EncryptUtils.js'
import CipherObjects from '../src/Utils/CipherObjects.js'

const custom_cipher = new EncryptUtils()
const global_cipher = new CipherObjects()

const random__dynamic_iv_ecrypt_text = 'c3239b314367060853f2bdcfb8c9af1c6f3a433f4b98f4b3401971a5261644c730c7b64f72f7926c1cd5d87e09eb1c5b4da50ba558feace6d995c6b4b533baf960a6c10f98eb8018097a8b3407c7c3e8'

const random_static_iv_encrypt_text = '19d071f274a6170c593422ea12cafe99409f7322ecaf0eba6eac4de7749af98e22b5a9d1e267ae464c22bb65f0a51c73'

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
            custom_cipher.symmetric_decrypt(random__dynamic_iv_ecrypt_text),
            'some random text to encrypt using iv in the text'
        )
    })
    it('Using static iv it should encrypt the data provided', function() {
        assert.notEqual(
            custom_cipher.static_iv_encrypt('soma random text to encrypt using statis iv'),
            'some random text to encrypt using statis iv'
        )
    })
    it('Using static iv it should decrypt the data provided', function() {
        assert.equal(
            custom_cipher.static_iv_decrypt(random_static_iv_encrypt_text),
            'this is a text to encrypt using static iv'
        )
    })
})
const dummy_user_model = {
    id_pk: 12,
    email: 'test@test.com',
    alias: 'testing_mine',
    password: '123asd',
    create_at: new Date('2020-01-10').toLocaleDateString(),
    update_at: new Date('2020-01-10').toLocaleDateString()
}
describe('Encrypt/Decrypt model data', function() {
    it('It Should not encrypt number or date values', function() {
        const encrypt_model = global_cipher.get_static_iv_encrypt_model(dummy_user_model)
        assert.equal(encrypt_model.id_pk, 12)
        assert.equal(encrypt_model.create_at, new Date('2020-01-10').toLocaleDateString())
        assert.equal(encrypt_model.update_at, new Date('2020-01-10').toLocaleDateString())
    })
})
