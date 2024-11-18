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
}