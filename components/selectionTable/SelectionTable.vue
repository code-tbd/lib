<template>
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
</template>

<script lang="ts" setup>
import { ElTable as TheElTable } from 'element-plus'
import { ref, nextTick, watch } from 'vue'
// v-model 双向绑定存多选表格选择项
// v-model 传递的值需要是表各项引用值的数组

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
