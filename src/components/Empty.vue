<template>
  <div class="empty">
    <slot v-if="!isEmpty"></slot>
    <div v-else class="empty-content">
      <img :src="imgSrc" alt=" " />
      <span>{{ props.description ?? 'No Data' }}</span>
      <slot name="extension"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isArrayLike } from 'lodash'

const props = defineProps<{
  value: Array<unknown> | ArrayLike<unknown> | boolean | null | undefined
  imgSrc: string
  imgSize: number
  description?: string
}>()

const isEmpty = computed(() => {
  const v = props.value
  if (Array.isArray(v) || isArrayLike(v)) {
    return v.length === 0
  }
  return !v
})

const imgSize = computed(() => props.imgSize + 'px')
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  height: 100%;

  user-select: none;

  .empty-content {
    height: 100%;
    font-size: 16px;
    color: #666;
    white-space: nowrap;
    text-overflow: ellipsis;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    img {
      width: v-bind(imgSize);
      height: v-bind(imgSize);
      object-fit: cover;
      flex-shrink: 0;
    }
  }
}
</style>
