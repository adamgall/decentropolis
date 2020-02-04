import Lottie from 'react-lottie'

export default class LottieWithAnimationControl extends Lottie {

  componentDidMount() {
    if (super.componentDidMount) {
      super.componentDidMount()
    }

    if (this.props.end) {
      this.anim.goToAndStop(this.anim.totalFrames - 1, true)
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, prevContext)
    }

    let frame = Math.round(this.anim.totalFrames * this.props.percentage)
    if (frame === this.anim.totalFrames) frame = frame - 1
    this.anim.goToAndStop(frame, true)
  }
}