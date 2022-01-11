/**
 * 管理组件页面切换状态
 * rank - 层级
 * rank 值越小表示越外层
 */

class PageState {
  private _pageMap: Record<string, number> = {}

  constructor(rootPageName: string) {
    this._pageMap[rootPageName] = 0
  }

  setRank(pageName: string, pageRank: number) {
    if (pageRank < 1) {
      throw Error('The rank value must be greater than 0!')
    }
    this._pageMap[pageName] = pageRank
  }

  getRank(pageName: string) {
    return this._pageMap[pageName]
  }
  /**
   * @description 参数1在外层时返回true
   *
   * @param {string} pageName1
   * @param {string} pageName2
   */
  compair(pageName1: string, pageName2: string) {
    return this.getRank(pageName1) < this.getRank(pageName2)
  }
}

const pageState = new PageState('home')

export { pageState }
