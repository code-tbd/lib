<template>
  <div class="upload">
    <el-upload drag action="" :show-file-list="false" :http-request="handleDrag">
      <div class="default-content" v-if="!url">
        <el-icon class="el-icon--upload">
          <upload-filled style="width: 0.64rem; height: 0.64rem" />
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="img-box" v-else>
        <img :class="props.fit" ref="imgDom" :src="url" />
      </div>
      <template #tip>
        <slot name="tip"></slot>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons'

const props = defineProps<{
  modelValue: File | undefined
  fit?: 'cover' | 'fill' | 'contain'
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', file: File): void
}>()

const useUpload = () => {
  const imgDom = ref<HTMLImageElement>()
  const file = ref<File>()
  const url = ref<string>()
  const handleDrag = (params: { file: File }) => {
    file.value = params.file
    emit('update:modelValue', params.file)
  }
  watch(
    () => props.modelValue,
    (cur) => {
      file.value = cur
    },
    {
      immediate: true,
      deep: true
    }
  )

  watch(
    file,
    (cur) => {
      if (cur) {
        url.value = URL.createObjectURL(cur)
      }
    },
    {
      deep: true,
      immediate: true
    }
  )
  return { imgDom, file, url, handleDrag }
}
const { imgDom, url, handleDrag } = useUpload()
</script>

<style lang="less" scoped>
.upload {
  position: relative;

  .default-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
  }

  .img-box {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .cover {
      object-fit: cover;
    }
    .fill {
      object-fit: fill;
    }
    .contain {
      object-fit: contain;
    }
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  :deep(.el-icon--upload) {
    margin-top: 0;
  }
}
</style>
