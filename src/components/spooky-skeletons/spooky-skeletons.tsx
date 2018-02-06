import { Component, State } from '@stencil/core'

const GRAVITY = 50
const SKELETONS_PER_SECOND = 20

const videoAttributes = {
  allow: 'encrypted-media',
  frameborder: 0,
  height: 0,
  src: 'https://www.youtube.com/embed/q6-ZGAGcJrk?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1',
  width: 0
}

@Component({
  shadow: true,
  styleUrl: 'spooky-skeletons.scss',
  tag: 'spooky-skeletons'
})
export class SpookySkeletons {

  @State() lastUpdate : number = null
  @State() skeletons : Skeleton[] = []
  @State() strobe : boolean = false

  private createSkeleton = () : Skeleton => {
    const speed = 400 * Math.random() + 1000
    const direction = Math.PI * (Math.random() + 1)
    return {
      image: this.pickRandomSkeletonImage(),
      position: { x: 0, y: 0 },
      velocity: {
        x: speed * Math.cos(direction),
        y: speed * Math.sin(direction)
      }
    }
  }

  private pickRandomSkeletonImage = () => {
    const images = [
      'https://media.giphy.com/media/Z6xMe82WsOCgo/giphy.gif',
      'https://media.giphy.com/media/IRj9isHwXxzNK/giphy.gif',
      'https://media.giphy.com/media/TGSvxwd5M3jSo/giphy.gif',
      'https://media.giphy.com/media/gBEQGrIADW0Xm/giphy.gif',
      'https://media.giphy.com/media/104yLcJUcMrTZS/giphy.gif'
    ]
    const index = Math.floor(images.length * Math.random())
    return images[index]
  }

  private spamSkeletons = () => {
    window.requestAnimationFrame(this.updateSkeletons)
  }

  private updateSkeletons = (currentTime: number) => {
    if (this.lastUpdate === null) {
      this.lastUpdate = currentTime
    }

    const duration = currentTime - this.lastUpdate
    const seconds = duration / 1000
    const maximumDistanceSquared = window.innerHeight * window.innerWidth

    const newSkeletons = this.skeletons
      .map(skeleton => {
        return {
          ...skeleton,
          position: {
            x: skeleton.position.x + skeleton.velocity.x * seconds,
            y: skeleton.position.y + skeleton.velocity.y * seconds
          },
          velocity: {
            x: skeleton.velocity.x,
            y: skeleton.velocity.y + GRAVITY
          }
        }
      })
      .filter(skeleton => {
        const { position: { x, y } } = skeleton
        const distanceSquared = x * x + y * y
        return distanceSquared < maximumDistanceSquared
      })
    if (Math.random() < SKELETONS_PER_SECOND * seconds) {
      newSkeletons.push(this.createSkeleton())
    }
    this.skeletons = newSkeletons

    this.lastUpdate = currentTime
    window.requestAnimationFrame(this.updateSkeletons)
  }

  private waitForTheDrop () {
    window.setTimeout(() => {
      this.strobe = true
      this.spamSkeletons()
    }, 8.5 * 1000)
  }

  componentWillLoad () {
    this.waitForTheDrop()
  }

  render () {
    const classes = ['overlay']
    if (this.strobe) {
      classes.push('strobe')
    }
    return (
      <div class={classes.join(' ')}>
        <iframe {...videoAttributes}></iframe>
        {
          this.skeletons.map(skeleton => {
            const { image, position: { x, y } } = skeleton
            const style = {
              transform: `translate(50vw, 50vh) translate(-50%, -50%) translate(${x}px, ${y}px)`
            }
            return <img class='skeleton' src={image} style={style} />
          })
        }
      </div>
    )
  }
}
