enum METHODS {
  GET = 'get',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch'
}
export default {
  [METHODS.GET]: async <R>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<IAxios<R>> => {
    const res = await request[METHODS.GET]<IAxios<R>>(url, config)
    const { code, message } = res.data
    if (code !== 200) {
      ElMessage.error({ message })
      throw new Error(message)
    } else {
      return res.data
    }
  },
  [METHODS.DELETE]: async <R>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<IAxios<R>> => {
    const res = await request[METHODS.DELETE]<IAxios<R>>(url, config)
    const { code, message } = res.data
    if (code !== 200) {
      ElMessage.error({ message })
      throw new Error(message)
    } else {
      return res.data
    }
  }
}
