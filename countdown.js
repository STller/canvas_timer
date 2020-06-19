let RADIUS = 8
let MARGIN_TOP = 60
let MARGIN_LEFT = 30

// 每次一个小时倒计时
let curShowTimeSeconds = 0

// 用来存增加的小球
let balls = []
// 颜色库
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000"
]

window.onload = function () {
  // 屏幕宽高度
  WINDOW_WIDTH = window.innerWidth
  WINDOW_HEIGHT = window.innerHeight

  // 调整上下左右的距离
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT

  curShowTimeSeconds = getCurrentShowTimeSeconds()

  function getCurrentShowTimeSeconds() {
    let curTime = new Date();
    // console.log(curTime.getHours(), curTime.getMinutes(), curTime.getSeconds())
    // 计算 精确到秒数
    let ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret
  }

  class Balls {
    constructor() {
      this.hours = (new Date()).getHours()
      this.minutes = (new Date()).getMinutes()
      this.seconds = (new Date()).getSeconds()
    }

    // 画一个数字
    renderDigit(x, y, num) {
      ctx.fillStyle = 'rgb(0, 102, 153)'
      for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
          if (digit[num][i][j] === 1) {
            // 画一个小球
            ctx.beginPath()
            ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
          }
        }
      }
    }

    render() {
      // 刷新矩形内部
      ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

      // 时 分 秒
      let hours = parseInt(this.hours)
      let minutes = parseInt(this.minutes)
      let seconds = parseInt(this.seconds)

      // 渲染所有的数字
      this.renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10))
      this.renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10))
      this.renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10)
      this.renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10))
      this.renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10))
      this.renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10,)
      this.renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10))
      this.renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10))

      // 渲染增加的彩色小球
      for (let i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].colors
        ctx.beginPath()
        // 逆时针
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
      }
    }

    update() {
      this.hours = parseInt((new Date()).getHours())
      this.minutes = parseInt((new Date()).getMinutes())
      this.seconds = parseInt((new Date()).getSeconds())
    }

    run() {
      this.render()
      this.update()
      window.requestAnimationFrame(this.run.bind(this))
    }
  }

  let a = new Balls()
  a.run()

}