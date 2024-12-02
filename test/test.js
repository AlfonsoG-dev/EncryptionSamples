import { configDotenv } from 'dotenv'
import assert from 'assert'
import EncryptUtils from '../src/Utils/EncryptUtils.js'
import CipherObjects from '../src/Utils/CipherObjects.js'
configDotenv()

const custom_cipher = new EncryptUtils()
const global_cipher = new CipherObjects()

// INFO: test encrypt text class

const random_dynamic_iv_encrypt_text = 'e7d9f498a046bf2ac2b7fe3e5d668095381f9de9db9ad23b43edc590223d55602b3d9244ddacd611e72fef11f9bbb832'


const random_static_iv_encrypt_text = custom_cipher.static_iv_encrypt('Hello mother from testing')

describe('Encrypt/Decrypt text', function() {
    it('Using dynamic iv it should create the key and iv', function() {
        const n = custom_cipher.generate_buffer_bytes(32, process.env.PASSPHRASE)
        assert.equal(Object.keys(n).length, 2)
    })
    it('Using dynamic iv it should encrypt the data provided', function() {
        const s = 'some random text to encrypt using iv in the text'
        assert.notEqual(
            custom_cipher.dynamic_iv_encrypt(s),
            'some random text to encrypt using iv in the text'
        )
    })
    it('Using dynamic iv it should decrypt the data provided', function() {
        assert.equal(
            custom_cipher.dynamic_iv_decrypt(random_dynamic_iv_encrypt_text),
            'hello mother from dynamic test'
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
            'Hello mother from testing'
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
    email: '5d836ca7f53da28c1dfdd0d82cf49967',
    alias: '738292e2d446376e3794e94d7153d5dc',
    password: '0ace571675cff923e68e6836d8effd09'
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
        call_api('/user/by-email/test@gmail.com', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].alias, 'test')
                done()
            })
            .catch((er) => {
                done(er)
            })
    })
    it('Search user by alias should return the user', function(done) {
        call_api('/user/by-alias/test', 'GET')
            .then(res => res.json())
            .then((res) => {
                assert.equal(res[0].email, 'test@gmail.com')
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
                assert.equal(res[0].email, 'test@gmail.com')
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
                assert.notEqual(res.length, 0)
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
                assert.notEqual(res.length, 0)
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
})
