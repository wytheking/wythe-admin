<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <Sidebar class="sidebar-container" :style="{backgroundColor: variables.menuBg}"></Sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar class="navbar-container"></Navbar>
      </div>
      <!-- 内容区 -->
      <AppMain class="appMain-container"></AppMain>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.modules.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.modules.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
