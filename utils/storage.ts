import { AES, enc, mode, pad } from 'crypto-js'
// storage
type Type = 'session' | 'local'
type NonEmptyArray<T> = [T, ...T[]]
type Pair = [string, string]

const RANDOM_KEY = 'z7ytWfGP&%sePwz!82s7ac&6%0KDWd0n'
const RANDOM_IV = '5@NmNiAFAPzxRinW!paFE81@NQ4d0mf!'

class CryptoStorage {
  private _type: Type
  private _methods: Storage

  constructor(type: Type) {
    this._type = type
    if (this._type === 'session') {
      this._methods = sessionStorage
    } else {
      this._methods = localStorage
    }
  }

  private _encrypt(plaintext: string) {
    return AES.encrypt(plaintext, RANDOM_KEY, {
      iv: enc.Utf8.parse(RANDOM_IV),
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString()
  }

  private _decrypt(ciphertext: string) {
    return AES.decrypt(ciphertext, RANDOM_KEY, {
      iv: enc.Utf8.parse(RANDOM_IV),
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString(enc.Utf8)
  }

  private _innerTransform(data: string): string
  private _innerTransform(...data: NonEmptyArray<string>): NonEmptyArray<string>
  private _innerTransform(
    ...data: NonEmptyArray<string>
  ): string | NonEmptyArray<string> {
    if (data.length > 1) {
      const arr: string[] = []
      data.forEach((str) => {
        arr.push(this._encrypt(str))
      })
      return arr as NonEmptyArray<string>
    } else {
      return this._encrypt(data[0])
    }
  }

  private _innerPair(key: string, value: string) {
    return this._innerTransform(key, value)
  }

  private _innerValue(key: string) {
    const innerKey = this._innerTransform(key)
    return this._methods.getItem(innerKey)
  }

  setItem(key: string, value: string) {
    const innerPair = this._innerPair(key, value) as Pair
    this._methods.setItem(...innerPair)
  }

  getItem(key: string) {
    const innerValue = this._innerValue(key)
    if (innerValue) {
      return this._decrypt(innerValue)
    } else {
      return null
    }
  }

  removeItem(key: string) {
    const innerValue = this._innerValue(key)
    if (innerValue) {
      this._methods.removeItem(innerValue)
    }
  }

  removeAll() {
    this._methods.clear()
  }

  get length() {
    return this._methods.length
  }
}

class CryptoLocalStorage extends CryptoStorage {
  constructor() {
    super('local')
  }
}
class CryptoSessionStorage extends CryptoStorage {
  constructor() {
    super('session')
  }
}

const cryptoLocalStorage = new CryptoLocalStorage()
const cryptoSessionStorage = new CryptoSessionStorage()

export { cryptoLocalStorage, cryptoSessionStorage }
