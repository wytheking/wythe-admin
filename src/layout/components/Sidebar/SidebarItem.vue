<template>
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :icon="route.meta.icon"></menu-item>
      <span>{{ route.meta.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <template v-for="children in route.children" :key="children.path">
      <sidebar-item :route="children"></sidebar-item>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="route.path">
    <menu-item :icon="route.meta.icon"></menu-item>
    <template #title>
      <span>{{ route.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { defineProps } from 'vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
