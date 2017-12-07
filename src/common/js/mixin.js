import {formatDate, formatAmount, formatImg, formatAvatar} from 'common/js/util';

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

const INTERFACE_SEQ = ['F1', 'F2', 'F3', 'PID1', 'PDW2', 'PTXL3', 'PYYS4', 'PZM5', 'PZM6', 'PZM7', 'PTD8'];
export const interfaceMixin = {
  methods: {
    /**
     * 根据当前位置获取下一页的路由
     * @param cur
     * @param list: [{name: '', complete: false}]
     * @returns {}
     */
    getNextPage(cur, list) {
      let index = INTERFACE_SEQ.indexOf(cur) + 1;
      if (index > 0) {
        let newList = INTERFACE_SEQ.slice(index);
        let nextIdx = -1;
        for (let i = 0; i < newList.length; i++) {
          let name = newList[i];
          let idx = list.findIndex(item => {
            return item.name === name && !item.complete;
          });
          if (idx >= 0 && name !== 'PTXL3') {
            nextIdx = i;
            break;
          }
        }
        if (nextIdx !== -1) {
          let result = {
            router: '',
            jump: true
          };
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
            case 'PTD8': result.router = 'PTD8'; result.jump = false; break;
          }
          return result;
        }
        return null;
      }
      return null;
    }
  }
};
