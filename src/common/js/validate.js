import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import CN from 'vee-validate/dist/locale/zh_CN';

Validator.localize('zh_CN', {
  messages: {
    ...CN.messages,
    required: '不能为空',
    regex: '格式错误',
    numeric: '只能包含数字',
    min: function(n, e) {
      return '至少有' + e[0] + '位';
    },
    max: function(n, e) {
      return '不能多于' + e[0] + '位';
    },
    email: '邮箱格式错误'
  }
});
Validator.extend('idCard', {
  getMessage: field => '格式错误',
  validate: value => {
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;  // (15位)
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; // (18位)
    return isIDCard1.test(value) || isIDCard2.test(value);
  }
});
Validator.extend('mobile', {
  getMessage: field => '格式错误',
  validate: value => /^1[3|4|5|7|8]\d{9}$/.test(value)
});
Validator.extend('captcha', {
  getMessage: field => '格式错误',
  validate: value => /^\d{4}$/.test(value)
});

const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true,
  validity: false,
  aria: true
};

Vue.use(VeeValidate, config);
