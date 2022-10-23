<template>
  <div class="navbar">
    <!-- 汉堡 -->
    <hamburger class="hamburger-container"></hamburger>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 页面引导 -->
      <guide class="right-menu-item right-menu-item-guide hover-effect"></guide>
      <!-- 页面搜索 -->
      <header-search class="right-menu-item right-menu-item-search hover-effect"></header-search>
      <!-- 全屏 -->
      <screenfull class="right-menu-item right-menu-item-full hover-effect"></screenfull>
      <!-- 主题更换（换肤） -->
      <theme-select id="guide-them" class="right-menu-item hover-effect"></theme-select>
      <!-- 国际化设置 -->
      <lang-select id="guide-lang" class="right-menu-item hover-effect"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="#">
              <el-dropdown-item>{{ $t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{ $t('navBar.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    padding-left: 16px;
    cursor: pointer;
    // hover动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
      &.right-menu-item-guide {
        padding: 0 9px 0 0;
      }
      &.right-menu-item-search {
        padding: 0 9px;
      }
      &.right-menu-item-full {
        padding: 0 18px 0 9px;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-bg-color: none;
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
