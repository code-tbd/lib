Array.prototype.initPush = function (...items: any[]): number {
  this.splice(0, this.length)
  return this.push(...items)
}
