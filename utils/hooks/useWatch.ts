import { watch } from 'vue'
type WatchParams = Parameters<typeof watch>
interface IWatcher {
  stop: () => void
  start: () => void
}
export const useWatch = (
  sources: WatchParams[0],
  cb: WatchParams[1],
  option?: WatchParams[2]
): IWatcher => {
  const watcher: Partial<IWatcher> = {}
  watcher.stop = watch(sources, cb, option)
  watcher.start = () => {
    watcher.stop = watch(sources, cb, Object.assign({ immediate: true }, option))
  }
  return watcher as IWatcher
}
