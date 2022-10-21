<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :icon="route.meta.icon" :iconName="route.meta.iconName"></menu-item>
      <span>{{ generateTitle(route.meta.title) }}</span>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <template #title>
      <span>{{ generateTitle(route.meta.title) }}</span>
    </template>
    <menu-item :icon="route.meta.icon" :iconName="route.meta.iconName"></menu-item>
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
