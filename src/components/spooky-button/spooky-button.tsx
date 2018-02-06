import { Component, State } from '@stencil/core'

@Component({
  tag: 'spooky-button',
  styleUrl: 'spooky-button.scss'
})
export class SpookyButton {

  @State() clicked : boolean = false

  private onClick = () => {
    this.clicked = true
  }

  render () {
    return (
      <button class={this.clicked ? 'clicked' : null} onClick={this.onClick}>
        <span class='skull'>💀</span>
        <slot />
        <span class='skull'>💀</span>
        {
          this.clicked
            ? <spooky-skeletons></spooky-skeletons>
            : null
        }
      </button>
    );
  }
}
