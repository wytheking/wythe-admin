<template>
  <!-- element icon -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- 非 element icon -->
  <svg-icon v-else class="svg-icon" :icon="icon"></svg-icon>
  <!-- <span>{{ title }}</span> -->
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  // title: {
  //   type: String,
  //   required: true
  // },
  icon: {
    type: String,
    required: true
  }
})
</script>
