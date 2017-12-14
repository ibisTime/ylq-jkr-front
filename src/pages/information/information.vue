<template>
  <div class="information-wrapper">
    <div class="form-wrapper">
      <div class="split-bar">基本信息</div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">学历</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="education">
            <option v-for="edu in educationList" :value="edu">
              {{edu.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">婚姻</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="marriage">
            <option v-for="mar in marriageList" :value="mar">
              {{mar.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">子女个数</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="childrenNum" v-model="childrenNum" v-validate="'required|numeric'" placeholder="请输入子女个数">
          <span v-show="errors.has('childrenNum')" class="error-tip">{{errors.first('childrenNum')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">居住省市</div>
        <div class="item-input-wrapper">
          <city-picker class="item-input"
                       :province="province"
                       :city="city"
                       :district="district"
                       @change="cityChange">
          </city-picker>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">详细地址</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="address" v-model="address" v-validate="'required|max:50'" placeholder="请输入详细地址">
          <span v-show="errors.has('address')" class="error-tip">{{errors.first('address')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">居住时长</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="liveTime">
            <option v-for="time in liveTimeList" :value="time">
              {{time.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">QQ</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="qq" v-model="qq" v-validate="'numeric'" placeholder="选填">
          <span v-show="errors.has('qq')" class="error-tip">{{errors.first('qq')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">电子邮箱</div>
        <div class="item-input-wrapper">
          <input type="email" class="item-input" name="email" v-model="email" v-validate="'email'" placeholder="选填">
          <span v-show="errors.has('email')" class="error-tip">{{errors.first('email')}}</span>
        </div>
      </div>
      <div class="split-bar">职业信息</div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">职业</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="occupation">
            <option v-for="oc in occupationList" :value="oc">
              {{oc.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">月收入</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="income">
            <option v-for="ic in incomeList" :value="ic">
              {{ic.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">单位省市</div>
        <div class="item-input-wrapper">
          <city-picker class="item-input"
                       :province="compProvince"
                       :city="compCity"
                       :district="compDistrict"
                       @change="compCityChange">
          </city-picker>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">单位名称</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="company" v-model="company" v-validate="'required|max:20'" placeholder="请输入单位名称">
          <span v-show="errors.has('company')" class="error-tip">{{errors.first('company')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">单位地址</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="companyAddress" v-model="companyAddress" v-validate="'required|max:50'" placeholder="请输入单位地址">
          <span v-show="errors.has('companyAddress')" class="error-tip">{{errors.first('companyAddress')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">单位电话</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="phone" v-model="phone" v-validate="'max:20'" placeholder="选填">
          <span v-show="errors.has('phone')" class="error-tip">{{errors.first('phone')}}</span>
        </div>
      </div>
      <div class="split-bar">紧急联系人</div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">亲属关系</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="familyRelation">
            <option v-for="fr in familyRelationList" :value="fr">
              {{fr.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="familyName" v-model="familyName" v-validate="'required|max:20'" placeholder="请输入姓名">
          <span v-show="errors.has('familyName')" class="error-tip">{{errors.first('familyName')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">联系方式</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="familyMobile" v-model="familyMobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('familyMobile')" class="error-tip">{{errors.first('familyMobile')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">社会关系</div>
        <div class="item-input-wrapper">
          <select class="item-input" v-model="societyRelation">
            <option v-for="sr in societyRelationList" :value="sr">
              {{sr.dvalue}}
            </option>
          </select>
          <i class="arrow"></i>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="societyName" v-model="societyName" v-validate="'required|max:20'" placeholder="请输入姓名">
          <span v-show="errors.has('societyName')" class="error-tip">{{errors.first('societyName')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">联系方式</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="societyMobile" v-model="societyMobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('societyMobile')" class="error-tip">{{errors.first('societyMobile')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="submit">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
    <toast ref="toast" text="信息认证失败，请检查数据无误后，重新提交"></toast>
  </div>
</template>
<script>
  import CityPicker from 'base/city-picker/city-picker';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {getDictList} from 'api/general';
  import {setUserInfo} from 'api/biz';
  import {setTitle} from 'common/js/util';
  import {directiveMixin, interfaceMixin} from 'common/js/mixin';

  export default {
    mixins: [directiveMixin, interfaceMixin],
    data() {
      return {
        loadFlag: true,
        loadText: '加载中...',
        education: null,
        educationList: [],
        marriage: null,
        marriageList: [],
        childrenNum: '',
        province: '北京市',
        city: '北京市',
        district: '昌平区',
        address: '',
        liveTime: null,
        liveTimeList: [],
        qq: '',
        email: '',
        occupation: null,
        occupationList: [],
        income: null,
        incomeList: [],
        compProvince: '北京市',
        compCity: '北京市',
        compDistrict: '昌平区',
        company: '',
        companyAddress: '',
        phone: '',
        familyRelation: null,
        familyRelationList: [],
        familyName: '',
        familyMobile: '',
        societyRelation: null,
        societyRelationList: [],
        societyName: '',
        societyMobile: ''
      };
    },
    computed: {
      provinceCity() {
        return this.province + ' ' + this.city + ' ' + this.district;
      },
      companyProvinceCity() {
        return this.compProvince + ' ' + this.compCity + ' ' + this.compDistrict;
      }
    },
    created() {
      setTitle('基本信息');
      this.init();
    },
    methods: {
      init() {
        this.getDictList().then(() => {
          this.loadFlag = false;
        }).catch(() => {
          this.loadFlag = false;
        });
      },
      getDictList() {
        return getDictList().then((data) => {
          data.forEach((item) => {
            switch (item.parentKey) {
              case 'education':
                this.educationList.push(item); break;
              case 'marriage':
                this.marriageList.push(item); break;
              case 'live_time':
                this.liveTimeList.push(item); break;
              case 'occupation':
                this.occupationList.push(item); break;
              case 'income':
                this.incomeList.push(item); break;
              case 'family_relation':
                this.familyRelationList.push(item); break;
              case 'society_relation':
                this.societyRelationList.push(item); break;
              default: break;
            }
          });
          this.education = this.educationList[0];
          this.marriage = this.marriageList[0];
          this.liveTime = this.liveTimeList[0];
          this.occupation = this.occupationList[0];
          this.income = this.incomeList[0];
          this.familyRelation = this.familyRelationList[0];
          this.societyRelation = this.societyRelationList[0];
        });
      },
      cityChange(prov, city, district) {
        this.province = prov;
        this.city = city;
        this.district = district;
      },
      compCityChange(prov, city, district) {
        this.compProvince = prov;
        this.compCity = city;
        this.compDistrict = district;
      },
      submit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadText = '提交中...';
            this.loadFlag = true;
            let {education: {dkey: education}, marriage: {dkey: marriage},
              childrenNum, address, liveTime: {dkey: liveTime}, qq, email,
              occupation: {dkey: occupation}, income: {dkey: income},
              company, companyAddress, phone, familyRelation: {dkey: familyRelation},
              familyName, familyMobile, societyRelation: {dkey: societyRelation},
              societyName, societyMobile} = this.$data;
            setUserInfo({
              education,
              marriage,
              childrenNum,
              address,
              liveTime,
              qq,
              email,
              occupation,
              income,
              company,
              companyAddress,
              phone,
              familyRelation,
              familyName,
              familyMobile,
              societyRelation,
              societyName,
              societyMobile,
              companyProvinceCity: this.companyProvinceCity,
              provinceCity: this.provinceCity
            }).then((data) => {
              this.loadFlag = false;
              if (data.isSuccess) {
                this.checkSuc({
                  name: 'F3',
                  complete: true
                });
              } else {
                this.$refs.toast.show();
              }
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
      }
    },
    components: {
      Toast,
      CityPicker,
      FullLoading,
      CommConfirm
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .information-wrapper {
    .split-bar {
      padding: 0 0.3rem;
      line-height: 0.6rem;
      font-size: $font-size-medium;
      background: $primary-color;
      color: #fff;
    }
    .arrow {
      position: absolute;
      right: 0.24rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      @include bg-image('more-gray');
      width: 0.3rem;
      height: 0.3rem;
      top: 50%;
      transform: translate(0, -50%);
    }
    .form-btn {
      margin-bottom: 0.3rem;
    }
  }
</style>
