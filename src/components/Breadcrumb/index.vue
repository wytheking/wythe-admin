<template>
  <el-breadcrumb id="guide-breadcrumb" class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- <el-breadcrumb-item>
        <span class="redirect" @click="onLinkClick('/')">{{ $t('navBar.home') }}</span>
      </el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="item,index in breadcrumbData" :key="item.path">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item.path)">
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

// 生成数据数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}

// 监听 路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 跳转点击事件
const router = useRouter()
const onLinkClick = path => {
  router.push(path)
}

// 将来需要主题替换，所以 hover 的颜色取 主题色
const store = useStore()
const linkHoverColor = store.getters.cssVar.menuBg
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  ::v-deep a {
    display: inline !important;
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
