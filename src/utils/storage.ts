/* eslint-disable @typescript-eslint/no-empty-interface */
import { AES, enc, mode, pad } from 'crypto-js'

type StorageType = 'session' | 'local'
type StringifyAllowed =
  | null
  | boolean
  | string
  | number
  | StringifyAllowedRecord
  | StringifyAllowedArray
interface StringifyAllowedRecord extends Record<string, StringifyAllowed> {}
interface StringifyAllowedArray extends Array<StringifyAllowed> {}
interface ItemData {
  value: StringifyAllowed
  expires?: number
  createTime?: number
}

const RANDOM_KEY = Math.random().toString()
const RANDOM_IV = Math.random().toString()
const ENCRYPT_MODE = true
const encryptConfig = {
  iv: enc.Utf8.parse(RANDOM_IV),
  mode: mode.CBC,
  padding: pad.Pkcs7
}

/**
 * @description feat:加密/可存储通过JSON.parse的复杂结构/可设置过期时间
 * @class CryptoStorage
 */
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
    return AES.encrypt(plainValue, RANDOM_KEY, encryptConfig).toString()
  }

  private decryptValue(cipherValue: string) {
    return AES.decrypt(cipherValue, RANDOM_KEY, encryptConfig).toString(enc.Utf8)
  }

  private encryptKey(plainKey: string) {
    return btoa(encodeURIComponent(plainKey))
  }

  /**
   * @param {string} key
   * @param {StringifyAllowed} value
   * @param {number} [expires] 单位：天
   * @memberof CryptoStorage
   */
  setItem(key: string, value: StringifyAllowed, expires?: number) {
    const itemData: ItemData = { value }
    if (expires) {
      Object.assign(itemData, { expires, createTime: Date.now() })
    }
    this.storage.setItem(
      ENCRYPT_MODE ? this.encryptKey(key) : key,
      ENCRYPT_MODE ? this.encryptValue(JSON.stringify(itemData)) : JSON.stringify(itemData)
    )
  }

  getItem(key: string) {
    const innerValue = this.storage.getItem(ENCRYPT_MODE ? this.encryptKey(key) : key)
    if (innerValue) {
      const itemData: ItemData = JSON.parse(
        ENCRYPT_MODE ? this.decryptValue(innerValue) : innerValue
      )
      if (itemData.expires && itemData.createTime) {
        const now = Date.now()
        const isTimeout = now - itemData.createTime > itemData.expires * 24 * 60 * 60 * 1000
        if (isTimeout) {
          this.removeItem(key)
          return null
        }
      }
      return itemData.value
    } else {
      return null
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(ENCRYPT_MODE ? this.encryptKey(key) : key)
  }

  removeAll() {
    this.storage.clear()
  }

  get length() {
    return this.storage.length
  }
}

const cryptoLocalStorage = new CryptoStorage('local')
const cryptoSessionStorage = new CryptoStorage('session')

export { cryptoLocalStorage, cryptoSessionStorage, CryptoStorage }
