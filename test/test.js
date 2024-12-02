import assert from 'assert'
import EncryptUtils from '../src/Utils/EncryptUtils.js'
import CipherObjects from '../src/Utils/CipherObjects.js'

const custom_cipher = new EncryptUtils()
const global_cipher = new CipherObjects()

// INFO: test encrypt text class

const random__dynamic_iv_encrypt_text = 'c3239b314367060853f2bdcfb8c9af1c6f3a433f4b98f4b3401971a5261644c730c7b64f72f7926c1cd5d87e09eb1c5b4da50ba558feace6d995c6b4b533baf960a6c10f98eb8018097a8b3407c7c3e8'

const random_static_iv_encrypt_text = '19d071f274a6170c593422ea12cafe99409f7322ecaf0eba6eac4de7749af98e22b5a9d1e267ae464c22bb65f0a51c73'

describe('Encrypt/Decrypt text', function() {
    it('It should create the key and iv', function() {
        const n = custom_cipher.generate_buffer_bytes(32, process.env.PASSPHRASE)
        assert.equal(Object.keys(n).length, 2)
    })
    it('It should encrypt the data provided', function() {
        const s = 'some random text to encrypt using iv in the text'
        assert.notEqual(
            custom_cipher.dynamic_iv_encrypt(s),
            'some random text to encrypt using iv in the text'
        )
    })
    it('It should decrypt the data provided', function() {
        assert.equal(
            custom_cipher.dynamic_iv_decrypt(random__dynamic_iv_encrypt_text),
            'some random text to encrypt using iv in the text'
        )
    })
    it('Using static iv it should encrypt the data provided', function() {
        assert.notEqual(
            custom_cipher.static_iv_encrypt('soma random text to encrypt using static iv'),
            'some random text to encrypt using static iv'
        )
    })
    it('Using static iv it should decrypt the data provided', function() {
        assert.equal(
            custom_cipher.static_iv_decrypt(random_static_iv_encrypt_text),
            'this is a text to encrypt using static iv'
        )
    })
})


// INFO: test encrypt model or end-point class
const dummy_user_model = {
    id_pk: 12,
    email: 'test@test.com',
    alias: 'testing_mine',
    password: '123asd',
    create_at: new Date('2020-01-10').toLocaleDateString(),
    update_at: new Date('2020-01-10').toLocaleDateString()
}

const dummy_user_model_encrypted = {
    email: '9db5467aaae023bb072bff4159c06f14',
    alias: '5850a740d0e97901964c67f9d54a9872',
    password: 'b3eb5f8490705052721fd39ad31eae88',
}

describe('Encrypt/Decrypt model data', function() {
    const encrypt_model = global_cipher.get_static_iv_encrypt_model(dummy_user_model)
    it('It should not encrypt number or date values', function() {
        assert.equal(encrypt_model.id_pk, 12)
        assert.equal(encrypt_model.create_at, new Date('2020-01-10').toLocaleDateString())
        assert.equal(encrypt_model.update_at, new Date('2020-01-10').toLocaleDateString())
    })
    it('It should encrypt string values', function() {
        // here the dummy_user_model has already been encrypted for the previous test
        assert.equal(dummy_user_model.email, dummy_user_model_encrypted.email)
        assert.equal(dummy_user_model.alias, dummy_user_model_encrypted.alias)
        assert.equal(dummy_user_model.password, dummy_user_model_encrypted.password)
    })
    it('It should decrypt encrypt model', function() {
        // here the dummy_user_model has already been encrypted for the previous test
        const decrypt_model = global_cipher.get_static_iv_decrypt_model(dummy_user_model_encrypted)
        assert.equal(decrypt_model.email, 'test@test.com')
        assert.equal(decrypt_model.alias, 'testing_mine')
        assert.equal(decrypt_model.password, '123asd')
    })
})
// INFO: test the end-points
const API_URL = 'http://127.0.1:3000'
async function call_api(url, type, body) {
    if(type === 'GET') {
        return await fetch(`${API_URL}${url}`, {
            method: 'GET'
        })
    } else if(type === 'POST') {
        return await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    } else if(type === 'DELETE') {
        return await fetch(`${API_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}

// INFO: test the end-point of user
describe('User end-point API', function() {
    it('Post user should status should not bee *200*', function(done) {
        done()
        /* enable when there is no user
        const dummy_user = {
            email: 'test@test.com',
            alias: 'testing_mine',
            password: '123asd'
        }
        call_api('/user/post-user', 'POST', dummy_user)
            .then((res) => {
                assert.equal(res.status, 200)
                done()
            })
            .catch((er) => {
                done(er)
            })
            */
    })
    it('Search user by email should return the user', function(done) {
        call_api('/user/by-email/test@test.com', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].alias, 'testing_mine')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
    it('Search user by alias should return the user', function(done) {
        call_api('/user/by-alias/testing_mine', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].email, 'test@test.com')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
    it('Search user by id_pk should return the user', function(done) {
        call_api('/user/by-id/1', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].email, 'test@test.com')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
})

// INFO: test the end-point of message
describe('Message end-point API', function() {
    it('Post message status should be *200*', function(done) {
        done()
        /* use when there is no messages
        const dummy_message = {
            user_id_fk: 1,
            head: 'Hello mother',
            body: 'this is a random message to my mother'
        }
        call_api('/message/post-message', 'POST', dummy_message)
            .then((res) => {
                assert.equal(res.status, 200)
                done()
            })
            .catch((er) => {
                done(er)
            })
            */
    })
    it('Search message by id_pk should return the message', function(done) {
        call_api('/message/by-id/1', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].head, 'Hello mother')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })

    it('Search message by user should return the message', function(done) {
        call_api('/message/by-user/1', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].head, 'Hello mother')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
    it('Search for all message should return the messages', function(done) {
        call_api('/message/all/10/0', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.notEqual(res.length, 0)
                done()
            })
            .catch((er) => {
                done(er)
            })
    })

    it('For the first 2 messages, they must have the same content but different encrypted data', function(done) {
        call_api('/message/all-raw/2/0', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.notEqual(res[0].head, res[1].head)
                assert.notEqual(res[0].body, res[1].body)
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
})
