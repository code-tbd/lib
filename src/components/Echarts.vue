<template>
  <div ref="chartDom" class="echarts"></div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { merge } from 'lodash'

const props = defineProps<{
  option: EChartsOption
}>()

const chartDom = ref<HTMLDivElement>()

onMounted(() => {
  if (chartDom.value) {
    const myChart = echarts.init(chartDom.value, undefined, {
      renderer: 'svg'
    })
    watch(
      () => props.option,
      (o) => {
        myChart.setOption(merge(baseOption(), o), true)
      },
      {
        immediate: true,
        deep: true
      }
    )
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  }
})

const baseOption = (): EChartsOption => ({
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  }
})
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
