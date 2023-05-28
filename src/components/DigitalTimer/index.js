import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: 25 * 60,
    timerLimit: 25,
    isPaused: true,
    buttonsEnabled: true,
    slideIn: false,
    rotate: false,
  }

  handleState = () => {
    const {isPaused, timer, slideIn} = this.state
    this.setState({slideIn: true})

    if (isPaused && timer > 0) {
      this.setState({isPaused: false, buttonsEnabled: false})
      this.timerId = setInterval(this.tick, 1000)
    } else {
      this.setState({isPaused: true})
      this.pauseTimer()
    }
  }

  pauseTimer = () => clearInterval(this.timerId)

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      this.pauseTimer()
      this.setState({isPaused: true})
    } else {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  increment = () => {
    const {buttonsEnabled} = this.state
    if (buttonsEnabled) {
      this.setState(prevState => ({
        timer: prevState.timerLimit * 60 + 60,
        timerLimit: prevState.timerLimit + 1,
      }))
    }
  }

  decrement = () => {
    const {timer, buttonsEnabled} = this.state
    if (buttonsEnabled && timer > 59) {
      this.setState(prevState => ({
        timer: prevState.timerLimit * 60 - 60,
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  resetTimer = () => {
    const {rotate} = this.state
    this.pauseTimer()
    this.setState({
      rotate: true,
      timer: 25 * 60,
      timerLimit: 25,
      isPaused: true,
      buttonsEnabled: true,
    })
  }

  conmponentWillUnmount() {
    clearTimeout(this.timerId)
  }

  render() {
    const {timer, timerLimit, isPaused, slideIn, rotate} = this.state
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    let pauseStartUrl
    let pauseStartText
    let pauseStartAlt

    if (isPaused) {
      pauseStartUrl =
        'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      pauseStartText = 'Start'
      pauseStartAlt = 'play icon'
    } else {
      pauseStartUrl =
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      pauseStartText = 'Pause'
      pauseStartAlt = 'pause icon'
    }

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="content-wrapper">
          <div className="timer-container">
            <div className="white-circle">
              <h1 className="timer-text">
                {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
              </h1>
              <p className="timer-state">{isPaused ? 'Paused' : 'Running'}</p>
            </div>
          </div>

          <div className="controllers-wrapper">
            <div className="timer-controls">
              <span className="start-pause-container">
                <button
                  type="button"
                  className="pause-play-btn"
                  onClick={this.handleState}
                >
                  <div className="overflow-box">
                    <img
                      src={pauseStartUrl}
                      alt={pauseStartAlt}
                      onAnimationEnd={() => this.setState({slideIn: false})}
                      className={slideIn ? 'pause-play-animation' : ''}
                    />
                  </div>
                  <p className="start-pause-text">{pauseStartText}</p>
                </button>
              </span>
              <span className="reset-container">
                <button
                  type="button"
                  className="reset-btn"
                  onClick={this.resetTimer}
                >
                  <img
                    onAnimationEnd={() => this.setState({rotate: false})}
                    className={rotate ? 'rotate' : ''}
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />

                  <p className="reset-text">Reset</p>
                </button>
              </span>
            </div>
            <p className="timer-limit-text">Set Timer limit</p>
            <div className="plus-minus-controls-wrapper">
              <button
                className="minus-btn"
                type="button"
                onClick={this.decrement}
              >
                -
              </button>
              <div className="timer-limit">
                <p>{timerLimit}</p>
              </div>
              <button
                className="plus-btn"
                type="button"
                onClick={this.increment}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
