import { ref } from 'vue'
import dayjs from 'dayjs'

const useTime = () => {
  const currentTime = ref('')
  const template = ref('YYYY-MM-DD hh:mm:ss')

  const getCurrentTime = () => dayjs().format(template.value)

  const formatTime = (newTemplate: string) => {
    template.value = newTemplate
  }

  setInterval(() => {
    currentTime.value = getCurrentTime()
  }, 1000)

  return { currentTime, formatTime }
}

export default useTime
