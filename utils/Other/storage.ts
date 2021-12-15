// Storage
type Type = 'session' | 'local'
type NonEmptyArray<T> = [T, ...T[]]
type Pair = [string, string]

class _Storage {
  private _encrypt
  private _type
  private _methods

  constructor(type: Type, encrypt?: boolean) {
    this._type = type
    this._encrypt = encrypt ?? true
    if (this._type === 'session') {
      this._methods = sessionStorage
    } else {
      this._methods = localStorage
    }
  }

  private _encode(plaintext: string) {
    return btoa(encodeURIComponent(plaintext))
  }

  private _decode(ciphertext: string) {
    return decodeURIComponent(atob(ciphertext))
  }

  private _innerTransform(data: string): string
  private _innerTransform(...data: NonEmptyArray<string>): NonEmptyArray<string>
  private _innerTransform(data: string | NonEmptyArray<string>): string | NonEmptyArray<string> {
    if (Array.isArray(data)) {
      const arr: string[] = []
      data.forEach((str) => {
        arr.push(this._encrypt ? this._encode(str) : str)
      })
      return arr as NonEmptyArray<string>
    } else {
      return this._encrypt ? this._encode(data) : data
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
      return this._encrypt ? this._decode(innerValue) : innerValue
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

  set length(value: any) {
    throw new Error(`
    don't set ${this._type}Storage length
    禁止手动设置 ${this._type}Storage 长度`)
  }
}

class LocalStorage extends _Storage {
  constructor(encrypt?: boolean) {
    super('local', encrypt)
  }
}

class SessionStorage extends _Storage {
  constructor(encrypt?: boolean) {
    super('session', encrypt)
  }
}

const ls = new LocalStorage()
const ss = new SessionStorage()

export { ls as localStorage, ss as sessionStorage }
