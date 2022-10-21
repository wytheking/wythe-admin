<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('navBar.screenfull')">
      <i id="guide-full"><svg-icon :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon></i>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullScreen = ref(false)

// 触发事件
const onToggle = () => {
  screenfull.toggle()
}

// 监听 screenfull 的变化
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}
// on: 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})
// off: 取消绑定监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
