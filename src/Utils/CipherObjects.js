import EncryptUtils from "./EncryptUtils.js"

export default class CipherObjects {
    encrypt
    constructor() {
        this.encrypt = new EncryptUtils()
        this.ignore_keys = ['id_pk', 'user_id_fk', 'create_at', 'update_at']
    }
    static_iv_encrypt_model_data(model) {
        if(!(model instanceof Object)) {
            throw new Error("Non object provided")
        }
        const keys = Object.keys(model)
        for(let k of keys) {
            if(!this.ignore_keys.includes(k)) {
                model[k] = this.encrypt.static_iv_encrypt(model[k])
            }
        }
    }
    static_iv_decrypt_model_data(model) {
        if(!(model instanceof Object)) {
            throw new Error("Non object provided")
        }
        const keys = Object.keys(model)
        for(let k of keys) {
            if(!this.ignore_keys.includes(k) && model[k] !== null) {
                model[k] = this.encrypt.static_iv_decrypt(model[k])
            }
        }
    }
    get_static_iv_encrypt_model(model) {
        if(model instanceof Array) {
            for(let e of model) {
                this.static_iv_encrypt_model_data(e)
            }
        } else {
            this.static_iv_encrypt_model_data(model)
        }
        return model
    }

    get_static_iv_decrypt_model(model) {
        if(model instanceof Array) {
            for(let e of model) {
                this.static_iv_decrypt_model_data(e)
            }
        } else {
            this.static_iv_decrypt_model_data(model)
        }
        return model
    }

    // INFO dynamic IV encrypt/decrypt methods \\

    dynamic_iv_encrypt_model_data(model) {
        if(!(model instanceof Object)) {
            throw new Error("Non object provided")
        }
        const keys = Object.keys(model)
        for(let k of keys) {
            if(!this.ignore_keys.includes(k)) {
                model[k] = this.encrypt.dynamic_iv_encrypt(model[k])
            }
        }
    }
    dynamic_iv_decrypt_model_data(model) {
        if(!(model instanceof Object)) {
            throw new Error("Non object provided")
        }
        const keys = Object.keys(model)
        for(let k of keys) {
            if(!this.ignore_keys.includes(k) && model[k] !== null) {
                model[k] = this.encrypt.dynamic_iv_decrypt(model[k])
            }
        }
    }
    get_dynamic_iv_encrypt_model(model) {
        if(model instanceof Array) {
            for(let e of model) {
                this.dynamic_iv_encrypt_model_data(e)
            }
        } else {
            this.dynamic_iv_encrypt_model_data(model)
        }
        return model
    }

    get_dynamic_iv_decrypt_model(model) {
        if(model instanceof Array) {
            for(let e of model) {
                this.dynamic_iv_decrypt_model_data(e)
            }
        } else {
            this.dynamic_iv_decrypt_model_data(model)
        }
        return model
    }
}
