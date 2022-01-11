import { AES, enc, mode, pad } from 'crypto-js'

type StorageType = 'session' | 'local'

const RANDOM_KEY = 'z7ytWfGP&%sePwz!82s7ac&6%0KDWd0n'
const RANDOM_IV = '&2Kx*iSF_cRyk*CjdX&bCHQBG_D7E6b6'
const ENCRYPT_MODE = true

class CryptoStorage {
  private type: StorageType
  private storage: Storage

  constructor(type: StorageType) {
    this.type = type
    if (this.type === 'session') {
      this.storage = sessionStorage
    } else {
      this.storage = localStorage
    }
  }

  private encryptValue(plainValue: string) {
    return AES.encrypt(plainValue, RANDOM_KEY, {
      iv: enc.Utf8.parse(RANDOM_IV),
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString()
  }

  private decryptValue(cipherValue: string) {
    return AES.decrypt(cipherValue, RANDOM_KEY, {
      iv: enc.Utf8.parse(RANDOM_IV),
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString(enc.Utf8)
  }

  private encryptKey(plainKey: string) {
    return btoa(encodeURIComponent(plainKey))
  }

  setItem(key: string, value: string) {
    ENCRYPT_MODE && this.storage.setItem(this.encryptKey(key), this.encryptValue(value))
    !ENCRYPT_MODE && this.storage.setItem(key, value)
  }

  getItem(key: string) {
    if (ENCRYPT_MODE) {
      const encryptValue = this.storage.getItem(this.encryptKey(key))
      return encryptValue ? this.decryptValue(encryptValue) : null
    } else {
      return this.storage.getItem(key)
    }
  }

  removeItem(key: string) {
    ENCRYPT_MODE && this.storage.removeItem(this.encryptKey(key))
    !ENCRYPT_MODE && this.storage.removeItem(key)
  }

  removeAll() {
    this.storage.clear()
  }

  get length() {
    return this.storage.length
  }
}

// class CryptoLocalStorage extends CryptoStorage {
//   constructor() {
//     super('local')
//   }
// }
// class CryptoSessionStorage extends CryptoStorage {
//   constructor() {
//     super('session')
//   }
// }

const cryptoLocalStorage = new CryptoStorage('local')
const cryptoSessionStorage = new CryptoStorage('session')

export { cryptoLocalStorage, cryptoSessionStorage }
