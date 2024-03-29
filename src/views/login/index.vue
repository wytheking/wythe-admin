<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>
      <!-- uername -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input v-model.trim="loginForm.username" placeholder="username" name="username" type="text" />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input v-model.trim="loginForm.password" :type="passwordType" placeholder="password" name="password" />
        <span class="svg-container" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%;margin-bottom: 30px;" :loading="loading" @click="handlerLogin">{{ $t('login.loginBtn') }}</el-button>

      <div class="tips" v-html="$t('login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect'
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 验证规则
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示问题
const passwordType = ref('password')
// 切换显示隐藏密码
const onChangePwdType = () => {
  // 当password的值为password时，改为text, 否则，反之
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handlerLogin = () => {
  // 1、进行表单校验
  loginFormRef.value.validate(valid => {
    if (!valid) return
    // 2、触发登录动作
    loading.value = true
    store.dispatch('user/userLogin', loginForm.value)
      .then((data) => {
        loading.value = false
        // TODO: 3、进行登录后处理
      })
      .catch(err => {
        console.error(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        display: inline-block;
        height: 47px;
        width: 80%;
        --el-input-border: none;
        --el-input-hover-border: none;
        --el-input-focus-border: none;
        --el-input-transparent-border: 0 0 0 1px transparent inset;
        --el-input-border-color: none;
        --el-input-bg-color: none;
        --el-input-hover-border-color: none;
        --el-input-clear-hover-color: none;
        --el-input-focus-border-color: none;
        .el-input__wrapper {
          height: 47px;
          width: 100%;
          color: $light_gray;
          caret-color: $cursor;
        }

        input {
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          caret-color: $cursor;
        }
      }
    }

    .tips {
      font-size: 16px;
      color: #fff;
      line-height: 20px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    .svg-icon {
      margin-right: 0 !important;
    }
  }

  .el-button {
    height: 47px;
  }
}
</style>
