/**
 * Created by caizb on 2017/7/31.
 */
let pluginSef = document.getElementById('pluginNet')
let getNetwork

switch (window.tvConfig.isTest) { // 是否调用电视api
  case false:
    getNetwork = function () {
      pluginSef.Open('Network', '1.001', 'Network')
      let ip = pluginSef.Execute('GetIP', '0') || pluginSef.Execute('GetIP', '1')
      let mac = pluginSef.Execute('GetMAC', '0') || pluginSef.Execute('GetMAC', '1')
      let macArr = []
      if (mac) {
        for (let i = 0; i < 6; i++) {
          macArr.push(mac.slice(0, 2))
          mac = mac.slice(2)
        }
      }
      mac = macArr.join(':')
      return {ip: ip, mac: mac}
    }
    break
  case true:
    getNetwork = function () {
      return {
        ip: '192.168.17.224',
        mac: '08:a5:c8:64:ad:95'
      }
    }
    break
}

export default getNetwork
