/**
 * Created by caizb on 2017/7/31.
 */
function toTime (x) {
  let n = Number(x / 1000)
  let h = Math.floor(n / 3600)
  let m = Math.floor((n - h * 3600) / 60)
  let s = parseInt(n - h * 3600 - m * 60)
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  return h + ':' + m + ':' + s
}

export {
  toTime
}
