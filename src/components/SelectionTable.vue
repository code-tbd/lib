<template>
  <div class="selection-table">
    <el-table
      v-if="
      $slots.default!().some((node) => {
        const result = node.props?.type === 'selection'
        return result
      }) 
    "
      ref="tableDom"
      @selection-change="
        (selection) => {
          $emit('update:modelValue', selection)
        }
      "
    >
      <slot></slot>
    </el-table>
    <div v-else>非多选表格请使用原生el-table</div>
  </div>
</template>

<script lang="ts" setup>
import { ElTable as TheElTable } from 'element-plus'
import { ref, nextTick, watch } from 'vue'

const props = defineProps<{
  modelValue?: any[]
}>()
const tableDom = ref<InstanceType<typeof TheElTable>>()
watch(
  () => props.modelValue,
  (cur) => {
    nextTick(() => {
      cur?.forEach((item) => {
        tableDom.value?.toggleRowSelection(item, true)
      })
    })
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
