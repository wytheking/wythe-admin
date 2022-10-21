<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb
        :image="$store.getters.userInfo.avatar"
        height="60px"
        width="60px"
        :hoverable="false"
      >
        {{ $t('profile.name') }}
      </pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('profile.name') }}</h3>
        <span>{{ $t('profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ $t('profile.Introduction') }}
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
