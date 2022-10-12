import i18n from '@/i18n'
export const validatePassword = (rule, value, callback) => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('login.passwordRule')))
    } else {
      callback()
    }
  }
}
