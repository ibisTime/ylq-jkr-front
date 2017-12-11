import {formatDate, formatAmount, formatImg, formatAvatar, setSearchReportCode,
  getSearchCode, setInterfaceInfo, getInterfaceInfo, updateInterface} from 'common/js/util';
import {getPageInvestigation, getReport} from 'api/biz';

export const commonMixin = {
  filters: {
    formatImg(img, suffix = '?imageMogr2/auto-orient') {
      return formatImg(img, suffix);
    },
    formatAvatar(img, suffix = '?imageMogr2/auto-orient') {
      return formatAvatar(img, suffix);
    },
    formatDate(date, format = 'yyyy-MM-dd') {
      if (!date) {
        return '--';
      }
      return formatDate(date, format);
    },
    formatAmount(price) {
      return formatAmount(price);
    }
  }
};

export const directiveMixin = {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  }
};
// F1:手机认证, F1:手机认证, F3:基本信息认证, PID1:身份证正反面, PDW2:强制定位, PTXL3:通讯录认证,
// PYYS4:运营商认证, PZM5:芝麻信用认证, PZM6:行业关注清单认证, PZM7:欺诈三接口认证, PTD8:同盾认证
const INTERFACE_SEQ = ['F1', 'F2', 'F3', 'PID1', 'PDW2', 'PTXL3', 'PYYS4', 'PZM5', 'PZM6', 'PZM7', 'PTD8'];
export const interfaceMixin = {
  created() {
    if (!getSearchCode()) {
      this.$router.replace('/redirect');
    }
  },
  methods: {
    // 获取未完成的调查单，并跳转到未完成的接口所对应的页面
    getPageInvestigation() {
      this.$refs.commConfirm.show('LOADING');
      return getPageInvestigation(1, 1).then((data) => {
        this.$refs.commConfirm.hide('LOADING');
        if (data.list.length) {
          let item = data.list[0];
          getReport(item.reportCode).then((report) => {
            // 设置调查单编号和对应的报告单的编号
            setSearchReportCode(item.code, item.reportCode);
            let arr = this.getInterfaceInfo(item, report);
            // 设置当前每个接口完成的状况
            setInterfaceInfo(arr);
            this.judgeRouter(this.getNextPage('F1', arr));
          });
        } else {
          this.noResult = true;
        }
      }).catch(() => {
        this.$refs.commConfirm.hide('LOADING');
      });
    },
    // 根据下一页的路由参数，跳转到指定页面
    judgeRouter(nextRoute) {
      if (nextRoute) {
        if (!nextRoute.complete) {
          if (nextRoute.router) {
            if (nextRoute.jump) {
              this.$router.push('/' + nextRoute.router);
            } else {
              if (nextRoute.router === 'PDW2') {
                this.$refs.commConfirm.show('DW');
              } else if (nextRoute.router === 'PZM7') {
                this.$refs.commConfirm.show('QZ');
              } else if (nextRoute.router === 'PTD8') {
                this.$refs.commConfirm.show('TD');
              }
            }
          } else {  // 只剩通讯录认证了，则提示用户去app端认证
            this.$refs.commConfirm.show('TXL');
          }
        } else {  // 调查完成
          this.$router.replace('/investigation-suc');
        }
      } else {  // 无法查到下一步
        this.noResult = true;
      }
    },
    // 根据当前接口完成的状况，跳转到指定页面
    goNextPage() {
      this.judgeRouter(this.getNextPage('F1', getInterfaceInfo()));
    },
    // 更新某个接口的完成情况
    updateInterface(name, complete, data) {
      updateInterface(name, complete, data);
    },
    /**
     * 根据调查单获取每个接口完成的状态
     * @param {Object} item
     */
    getInterfaceInfo(searchData, reportData) {
      let searchInterfaces = Object.keys(searchData).filter(k => (INTERFACE_SEQ.indexOf(k) > -1 && searchData[k] !== 'N'));
      return searchInterfaces.map((key) => ({
        name: key,
        data: reportData[key],
        complete: !!reportData[key]
      }));
    },
    /**
     * 根据当前位置获取下一页的路由
     * @param cur
     * @param list: [{name: '', complete: false}]
     * @returns {}
     */
    getNextPage(cur, list = []) {
      if (!list || !list.length) {
        return null;
      }
      let index = INTERFACE_SEQ.indexOf(cur) + 1;
      if (index > 0) {
        let newList = INTERFACE_SEQ.slice(index);
        let nextIdx = -1;
        let txlIdx = -1;
        for (let i = 0; i < newList.length; i++) {
          let name = newList[i];
          let idx = list.findIndex(item => {
            return item.name === name && !item.complete;
          });
          if (idx >= 0) {
            if (name === 'PTXL3') {
              txlIdx = i;
            } else {
              nextIdx = i; break;
            }
          }
        }
        let result = {
          router: '',
          jump: true,
          complete: false
        };
        if (nextIdx !== -1) {
          switch (newList[nextIdx]) {
            case 'F1': result.router = 'login'; break;
            case 'F2': result.router = 'zmrz'; break;
            case 'F3': result.router = 'info'; break;
            case 'PID1': result.router = 'sfzsc'; break;
            case 'PDW2': result.router = 'PDW2'; result.jump = false; break;
            case 'PTXL3': result.jump = false; break;
            case 'PYYS4': result.router = 'yysrz'; break;
            case 'PZM5': result.router = 'zmfrz'; break;
            case 'PZM6': result.router = 'hygzqd'; break;
            case 'PZM7': result.router = 'PZM7'; result.jump = false; break;
            case 'PTD8': result.router = 'PTD8'; result.jump = false;
          }
          return result;
        }
        result.jump = false;
        if (txlIdx === -1) {
          result.complete = true;
        }
        return result;
      }
      return null;
    },
    checkSuc({name, complete, data}) {
      this.updateInterface(name, complete, data);
      this.goNextPage();
    }
  }
};
