// 传入引用值，移除数组中的该引用，并返回其原来的索引
Array.prototype.remove = function (item: any) {
  const index = this.indexOf(item)
  if (index > -1) {
    this.splice(index, 1)
  }
  return index
}
