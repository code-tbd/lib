<template>
  <div class="confirm">
    <span class="main" @click="dialogVisible = true">
      <slot></slot>
    </span>
    <el-dialog v-model="dialogVisible" width="30%">
      <div class="text">确认删除？</div>
      <div class="buttons">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const dialogVisible = ref(false)

const handleConfirm = () => {
  emit('confirm')
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  display: flex;
  flex-direction: column;
  gap: 52px;
  .text {
    text-align: center;
  }
  .buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
