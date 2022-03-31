import store from '@/store'

const language = {
  title: {
    'zh-CN': '尊敬的',
    'en-US': 'Dear'
  },
  back: {
    'zh-CN': '返回',
    'en-US': 'Go Back'
  },
  select: {
    'zh-CN': '选择',
    'en-US': '返回'
  },
  press1: {
    'zh-CN': '按',
    'en-US': 'Press'
  },
  press2: {
    'zh-CN': '进入',
    'en-US': 'Enter'
  },
  dire: {
    'zh-CN': '导演',
    'en-US': 'Director'
  },
  act: {
    'zh-CN': '主演',
    'en-US': 'Actors'
  },
  countryType: {
    '0': {
      'zh-CN': '国内',
      'en-US': 'China'
    },
    '1': {
      'zh-CN': '海外',
      'en-US': 'Overseas'
    }
  },
  checkOutTitle: {
    'zh-CN': '快速退房',
    'en-US': 'Check Out'
  },
  subtitle1: {
    'zh-CN': '是否确认快速退房？',
    'en-US': 'Are you sure to check out?'
  },
  subtitle2: {
    'zh-CN': '此操作将不可逆转，请谨慎选择！',
    'en-US': 'This operation will be irreversible, please choose carefully!'
  },
  checkoutTxt: {
    'zh-CN': '退房成功',
    'en-US': 'Check out success!'
  },
  cancel: {
    'zh-CN': '取消',
    'en-US': 'Cancel'
  },
  sure: {
    'zh-CN': '确定',
    'en-US': 'Sure'
  },
  checkSuccess: {
    'zh-CN': '退房成功',
    'en-US': 'CheckOut Success'
  },
  toolbar: {
    press: {
      'zh-CN': '按',
      'en-US': 'Press'
    },
    back: {
      'zh-CN': '返回',
      'en-US': 'Back'
    },
    select: {
      'zh-CN': '进行选择',
      'en-US': 'Select'
    },
    selectLanguage: {
      'zh-CN': '选择语言',
      'en-US': 'Select Language'
    },
    ok: {
      'zh-CN': '确认',
      'en-US': 'Ok'
    },
    enter: {
      'zh-CN': '进入',
      'en-US': 'Enter'
    }
  },
  flight: {
    takeOff: {
      'zh-CN': '起飞',
      'en-US': 'Take Off'
    },
    land: {
      'zh-CN': '降落',
      'en-US': 'Land'
    },
    flightNum: {
      'zh-CN': '航班号',
      'en-US': 'FlightNum'
    },
    depTime: {
      'zh-CN': '计划起飞',
      'en-US': 'DepTime'
    },
    dexpected: {
      'zh-CN': '实际起飞',
      'en-US': 'Dexpected'
    },
    arrTime: {
      'zh-CN': '计划到达',
      'en-US': 'ArrTime'
    },
    aexpected: {
      'zh-CN': '实际到达',
      'en-US': 'Aexpected'
    },
    destination: {
      'zh-CN': '到达机场楼',
      'en-US': 'Destination'
    },
    departure: {
      'zh-CN': '出发机场楼',
      'en-US': 'Departure'
    },
    intro: {
      'zh-CN': '查询信息仅供参考',
      'en-US': 'Inquiry information is for reference only'
    },
    searching: {
      'zh-CN': '正在查询',
      'en-US': 'Searching'
    }
  },
  dinner: {
    tel: {
      'zh-CN': '订餐电话',
      'en-US': 'Order Tel'
    }
  },
  bill: {
    name: {
      'zh-CN': '名称',
      'en-US': 'Name'
    },
    number: {
      'zh-CN': '数量',
      'en-US': 'Number'
    },
    price: {
      'zh-CN': '价格',
      'en-US': 'Price'
    },
    time: {
      'zh-CN': '时间',
      'en-US': 'Time'
    },
    total: {
      'zh-CN': '总计',
      'en-US': 'Total'
    }
  }
}

export function t (p, c) {
  return c ? language[p][c][store.state.language] : language[p][store.state.language]
}

export default language
