import { flush, render } from '@stencil/core/testing'
import { SpookyButton } from './spooky-button'

describe('spooky-button', () => {
  it('should build', () => {
    expect(new SpookyButton()).toBeTruthy()
  })

  describe('rendering', () => {
    it('without content', async () => {
      const element = await render({
        components: [SpookyButton],
        html: '<spooky-button></spooky-button>'
      })
      expect(element).toMatchSnapshot()
    })

    it('with content', async () => {
      const element = await render({
        components: [SpookyButton],
        html: `
          <spooky-button>
            Test content
          </spooky-button>
        `
      })
      expect(element).toMatchSnapshot()
    })

    it('on click', async () => {
      const element = await render({
        components: [SpookyButton],
        html: '<spooky-button></spooky-button>'
      })
      element.querySelector('button').click()
      await flush(element)
      expect(element).toMatchSnapshot()
    })
  })
})
