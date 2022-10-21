<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('navBar.themeChange')">
        <i><svg-icon icon="change-theme"></svg-icon></i>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor'

// dialog
const selectColorVisible = ref(false)

const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss"></style>
