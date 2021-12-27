// 清空数组并push数据
Array.prototype.initPush = function (...items: any[]): number {
  this.splice(0, this.length)
  return this.push(...items)
}
