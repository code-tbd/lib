// 可控制开启暂停的watch
import { watch } from 'vue'
type WatchParams = Parameters<typeof watch>
interface IWatcher {
  stop: () => void
  start: () => void
  startWithInvoke: () => void
}
export const useWatch = (
  sources: WatchParams[0],
  cb: WatchParams[1],
  option?: WatchParams[2]
): IWatcher => {
  const watcher: Partial<IWatcher> = {}
  watcher.stop = watch(sources, cb, option)
  watcher.start = () => {
    if (option?.immediate) {
      delete option.immediate
    }
    watcher.stop = watch(sources, cb, option)
  }
  watcher.startWithInvoke = () => {
    watcher.stop = watch(
      sources,
      cb,
      Object.assign({ immediate: true }, option)
    )
  }
  return watcher as IWatcher
}
