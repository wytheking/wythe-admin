<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :icon="route.meta.icon"></menu-item>
      <span>{{ generateTitle(route.meta.title) }}</span>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item v-for="children in route.children" :key="children.path" :route="children"></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :icon="route.meta.icon"></menu-item>
    <template #title>
      <span>{{ generateTitle(route.meta.title) }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
