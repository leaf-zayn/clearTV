/**
 * Created by caizb on 2017/7/10.
 */
import store from '@/store'
import bg from '../img/bg_window.png'
import {toTime} from './utils'

let initKey

let playVideo
let stopPlay
let pausePlay
let changeVideo

let playMusic
let changeMusic
let playEnd

let jumpRight
let blkjumpRight
let jumpLeft
let blkjumpLeft

let playStatus
let videoURL

let onEvent
let onLiveEvent
let onPlayEvent

let pluginSef = document.getElementById('pluginSef')
let pluginObjectTVMW = document.getElementById('pluginObjectTVMW')
let PL_MEDIA_SOURCE
let totalTime = 0
let currentTime = 0
let startTime
let endTime

let blkTime = null
let noneFlag = false
let FastFlog = false
let stopFlag = false
let blkT

let loadingComplete // 视频加载完回调函数
let playComplete // 视频加载完回调函数

// 判断当前是否是本地测试环境
if (!window.tvConfig.isTest) {
  let widgetAPI = new window.Common.API.Widget()
  let pluginObj = new window.Common.API.Plugin()
  let tvKey = new window.Common.API.TVKeyValue()

  let SEF_EVENT_TYPE = {
    CONNECTION_FAILED: 1,
    AUTHENTICATION_FAILED: 2,
    STREAM_NOT_FOUND: 3,
    NETWORK_DISCONNECTED: 4,
    NETWORK_SLOW: 5,
    RENDER_ERROR: 6,
    RENDERING_START: 7,
    RENDERING_COMPLETE: 8,
    STREAM_INFO_READY: 9,
    DECODING_COMPLETE: 10,
    BUFFERING_START: 11,
    BUFFERING_COMPLETE: 12,
    BUFFERING_PROGRESS: 13,
    CURRENT_DISPLAY_TIME: 14,
    AD_START: 15,
    AD_END: 16,
    RESOLUTION_CHANGED: 17,
    BITRATE_CHANGED: 18,
    SUBTITLE: 19,
    CUSTOM: 20
  }

  let player = function () {
    setInterval(function () {
      if (!FastFlog) {
        startTime = toTime(currentTime)
        endTime = toTime(totalTime)
        // document.getElementById('debug').innerHTML='current_Time:' + current_Time +'totalTime:' + totalTime;
        document.getElementById('startTime').innerHTML = startTime
        document.getElementById('endTime').innerHTML = endTime
        let _width = (currentTime / totalTime) * 100 + '%'
        document.getElementById('playtime').style.width = _width
      }
    }, 500)
  }
  // 允许音量键和静音键
  initKey = function () {
    pluginObj.unregistKey(tvKey.KEY_VOL_UP)
    pluginObj.unregistKey(tvKey.KEY_VOL_DOWN)
    pluginObj.unregistKey(tvKey.KEY_MUTE)
  }
  /* 播放视频 */
  playVideo = function (url, pageType, loadingcallback, playcallback) {
    loadingComplete = loadingcallback
    playComplete = playcallback
    document.body.style.backgroundImage = 'none'
    videoURL = url
    let type = videoURL.split('.').pop()
    if (type === 'ts' || type === 'mp4') {
      // videoURL = videoURL
    } else if (type === 'm3u8') {
      videoURL += '|COMPONENT=HLS'
    }
    widgetAPI.sendReadyEvent()
    if (pageType === 'welcome') {
      PL_MEDIA_SOURCE = 43
      pluginObj.unregistKey(tvKey.KEY_VOL_UP)
      pluginObj.unregistKey(tvKey.KEY_VOL_DOWN)
      pluginObj.unregistKey(tvKey.KEY_MUTE)
    } else if (pageType === 'live' || pageType === 'movie') {
      PL_MEDIA_SOURCE = 43
    }

    pluginSef.Open('Player', '1.112', 'Player')
    // 事件绑定
    switch (pageType) {
      case 'welcome':
        pluginSef.OnEvent = onEvent
        break
      case 'live':
        pluginSef.OnEvent = onLiveEvent
        break
      case 'movie':
        pluginSef.OnEvent = onPlayEvent
        break
    }

    if (parseInt(pluginObjectTVMW.GetSource(), 10) !== PL_MEDIA_SOURCE) {
      pluginObjectTVMW.SetSource(PL_MEDIA_SOURCE)
    }
    pluginSef.Execute('InitPlayer', videoURL)
    pluginSef.Execute('Start', videoURL)
    pluginSef.Execute('StartPlayback', 0)
    playStatus = 'Resume'

    setTimeout(function () {
      player()
    }, 3000)
  }
  /* 切视频 */
  changeVideo = function (videoURL) {
    let type = videoURL.split('.').pop()
    if (type === 'ts' || type === 'mp4') {
    } else if (type === 'm3u8') {
      videoURL += '|COMPONENT=HLS'
    }
    pluginSef.Execute('Stop')
    pluginSef.Execute('InitPlayer', videoURL)
    pluginSef.Execute('Start', videoURL)
    pluginSef.Execute('StartPlayback', 0)
  }
  /* 停止播放 */
  stopPlay = function (type) {
    if (type !== 'music') {
      document.body.style.backgroundImage = 'url(' + bg + ')'
    }
    try {
      pluginSef.Execute('Stop')
      playStatus = 'Stop'
      document.getElementById('all').style.display = 'none'
    } catch (e) {
    }
  }
  /* 停止播放 */
  pausePlay = function (type) {
    if (type !== 'music') {
      document.getElementById('all').style.display = 'block'
    }
    if (playStatus === 'Resume') {
      pluginSef.Execute('Pause') // 暂停播放
      playStatus = 'Pause'
    } else if (playStatus === 'Pause') {
      pluginSef.Execute('Resume') // 恢复播放
      playStatus = 'Resume'
    }
  }
  /* 快进 */
  jumpRight = function () {
    if (stopFlag) return
    stopFlag = true
    noneFlag = false
    FastFlog = true

    if (blkTime === null) {
      blkTime = currentTime / totalTime
    }

    document.getElementById('all').style.display = 'block'

    blkTime += 0.01
    if (blkTime > 0.99) blkTime = 0.99

    document.getElementById('startTime').innerHTML = toTime(parseInt(blkTime * totalTime))
    let _width = blkTime * 100 + '%'
    document.getElementById('playtime').style.width = _width

    clearTimeout(blkT)
    blkT = setTimeout(function () {
      noneFlag = true
    }, 7000)
    setTimeout(function () {
      stopFlag = false
    }, 50)
  }
  blkjumpRight = function () {
    let timeLength = Math.abs(parseInt(blkTime * totalTime - currentTime)) / 1000
    pluginSef.Execute('JumpForward', timeLength)
    pluginSef.Execute('play', videoURL)
    pluginSef.Execute('StartPlayback', 1)
    setTimeout(function () {
      FastFlog = false
    }, 3500)
  }

  jumpLeft = function () {
    if (stopFlag) return
    stopFlag = true
    noneFlag = false

    FastFlog = true

    if (blkTime === null) {
      blkTime = currentTime / totalTime
    }
    document.getElementById('all').style.display = 'block'

    blkTime -= 0.01
    if (blkTime < 0) blkTime = 0
    document.getElementById('startTime').innerHTML = toTime(parseInt(blkTime * totalTime))

    let _width = blkTime * 100 + '%'
    document.getElementById('playtime').style.width = _width

    clearTimeout(blkT)
    blkT = setTimeout(function () {
      noneFlag = true
    }, 7000)
    setTimeout(function () {
      stopFlag = false
    }, 50)
  }

  blkjumpLeft = function () {
    let timeLength = Math.abs(parseInt(blkTime * totalTime - currentTime)) / 1000
    pluginSef.Execute('JumpBackward', timeLength)
    pluginSef.Execute('play', videoURL)
    pluginSef.Execute('StartPlayback', 1)
    // blktime = null;
    setTimeout(function () {
      FastFlog = false
    }, 3500)
  }

  onEvent = function (event, data1, data2) {
    // document.getElementById('test').innerHTML += '<br>onEvent=='+event+' param1 : '+data1+' param2 : '+data2;
    switch (event) {
      case SEF_EVENT_TYPE.STREAM_INFO_READY:
        totalTime = Number(pluginSef.Execute('GetDuration'))
        break

      case SEF_EVENT_TYPE.DECODING_COMPLETE:
        break

      case SEF_EVENT_TYPE.BUFFERING_COMPLETE: // 缓冲完成
        loadingComplete()
        break
      // 通知当前播放时间

      case SEF_EVENT_TYPE.CURRENT_DISPLAY_TIME:
        currentTime = Number(data1)
        if (currentTime > 3000) {
          return false
        }
        if (currentTime >= totalTime) {
          pluginSef.Execute('JumpBackward', totalTime)
        }
        break

      case SEF_EVENT_TYPE.RENDERING_COMPLETE:
        break

      case SEF_EVENT_TYPE.NETWORK_DISCONNECTED:
        store.commit('setTestObj', {event, data1})
        break

      case SEF_EVENT_TYPE.CONNECTION_FAILED:
        break

      case SEF_EVENT_TYPE.STREAM_NOT_FOUND:
        break

      case SEF_EVENT_TYPE.NETWORK_SLOW:
        break
    }
  }

  onLiveEvent = function (event, data1, data2) {
    switch (event) {
      case SEF_EVENT_TYPE.STREAM_INFO_READY:
        break

      case SEF_EVENT_TYPE.DECODING_COMPLETE:
        break

      case SEF_EVENT_TYPE.BUFFERING_COMPLETE:
        loadingComplete()
        break

      case SEF_EVENT_TYPE.CURRENT_DISPLAY_TIME:
        break

      case SEF_EVENT_TYPE.RENDERING_COMPLETE:
        break

      case SEF_EVENT_TYPE.NETWORK_DISCONNECTED:
        break

      case SEF_EVENT_TYPE.CONNECTION_FAILED:
        break

      case SEF_EVENT_TYPE.STREAM_NOT_FOUND:
        break

      case SEF_EVENT_TYPE.NETWORK_SLOW:
        break

      case SEF_EVENT_TYPE.RENDERING_START:
        break
    }
  }

  onPlayEvent = function (event, data1, data2) {
    switch (event) {
      case SEF_EVENT_TYPE.STREAM_INFO_READY:
        totalTime = Number(pluginSef.Execute('GetDuration'))
        break

      case SEF_EVENT_TYPE.DECODING_COMPLETE:
        break

      case SEF_EVENT_TYPE.BUFFERING_COMPLETE:
        loadingComplete()
        break

      case SEF_EVENT_TYPE.CURRENT_DISPLAY_TIME:
        currentTime = Number(data1)
        break

      case SEF_EVENT_TYPE.RENDERING_COMPLETE:
        playComplete()
        break

      case SEF_EVENT_TYPE.NETWORK_DISCONNECTED:
        break

      case SEF_EVENT_TYPE.CONNECTION_FAILED:
        break

      case SEF_EVENT_TYPE.STREAM_NOT_FOUND:
        break

      case SEF_EVENT_TYPE.NETWORK_SLOW:
        break
    }
  }

  setInterval(function () {
    if (noneFlag) {
      document.getElementById('all').style.display = 'none'
      blkTime = null
    }
  }, 1000)

  playMusic = function (musicURL) {
    widgetAPI.sendReadyEvent()

    pluginSef = document.getElementById('pluginSef')
    pluginSef.Open('Player', '1.000', 'Player')
    pluginSef.OnEvent = onPlayEvent

    pluginSef.Execute('InitPlayer', musicURL)
    pluginSef.Execute('Start', musicURL)
    pluginSef.Execute('StartPlayback', 0)
    playStatus = 'Resume'
  }

  changeMusic = function (musicURL) {
    pluginSef.Execute('Stop')
    pluginSef.Execute('InitPlayer', musicURL)
    pluginSef.Execute('Start', musicURL)
    pluginSef.Execute('StartPlayback', 0)
  }

  playEnd = function () {
    if (totalTime !== 0 && currentTime === totalTime) {
      totalTime = 0
      return true
    } else {
      return false
    }
  }
} else {
  initKey = function () {
    console.log('初始化电视机按键')
  }
  stopPlay = function (type) {
    if (type !== 'music') {
      document.body.style.backgroundImage = 'url(' + bg + ')'
    }
    console.log('停止播放')
  }

  playVideo = function (url, type, callback) {
    document.body.style.backgroundImage = 'none'
    callback()
    console.log('开始播放视频', url, type)
  }

  changeVideo = function () {
    document.body.style.backgroundImage = 'none'
    console.log('切换视频')
  }

  pausePlay = function () {
    console.log('暂停视频')
  }

  jumpRight = function () {
    console.log('快进视频进度条')
  }

  blkjumpRight = function () {
    console.log('快进视频')
  }

  jumpLeft = function () {
    console.log('后退视频进度条')
  }

  blkjumpLeft = function () {
    console.log('后退视频')
  }

  playMusic = function (url) {
    console.log('播放音乐', url)
  }

  changeMusic = function (url) {
    console.log('切换音乐', url)
  }

  playEnd = function () {
    return false
  }
}

export {
  initKey,
  playVideo,
  stopPlay,
  changeVideo,
  pausePlay,
  jumpRight,
  blkjumpRight,
  jumpLeft,
  blkjumpLeft,
  playMusic,
  changeMusic,
  playEnd
}
