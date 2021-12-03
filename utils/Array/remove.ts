Array.prototype.remove = function (item: any) {
  const index = this.indexOf(item)
  if (index > -1) {
    this.splice(index, 1)
  }
  return index
}
