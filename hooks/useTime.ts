import type { Ref } from 'vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
export const useTime = (): Ref<string> => {
  const time = ref(dayjs().format('YYYY-MM-DD') + '  ' + dayjs().format('HH:mm'))
  setInterval(() => {
    time.value = dayjs().format('YYYY-MM-DD') + '  ' + dayjs().format('HH:mm')
  }, 1000)
  return time
}
