<template>
  <div class="">
    <div class="logo-container">
      <el-avatar :size="44" :shape="square" :src="$store.getters.userInfo.avatar"></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">wythe-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
}
</style>
