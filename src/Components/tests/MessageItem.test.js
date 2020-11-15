import { render, screen } from '@testing-library/react'
import { MessageItem } from '../MessageItem'

const fakeMessage = "Integer vehicula lacus velit, placerat tempor ligula convallis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam imperdiet quam eu congue varius. Maecenas rhoncus orci ut enim imperdiet tempor. Praesent vitae justo lectus. Pellentesque lobortis tincidunt quam eu eleifend. Duis ac lorem sagittis, efficitur lacus sit amet, iaculis mi. Ut dapibus ante elit, nec maximus lorem auctor in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec diam ut nisl vestibulum dignissim."
const originalConsoleError = console.error


describe('MessageItem tests:', () => {

  /*
  * By default a PropType warning will never fail a test.
  * I want to check that we'll have a console error if we don't pass "message"
  */
  beforeEach(() => {
    console.error = (...args) => {
      const propTypeFailures = [/Failed prop type/, /Warning/]

      if (propTypeFailures.some(p => p.test(args[0]))) {
        throw new Error(args[0])
      }

      originalConsoleError(...args)
    }
  })

  afterEach(() => (console.error = originalConsoleError))

  test('Message should not be shown', () => {
    render(<MessageItem message={fakeMessage} isPrivate={true}/>)

    const fakeMessageRegex = new RegExp(`/${fakeMessage}/`)
    expect(screen.queryByText(fakeMessageRegex)).toBeNull()
  })

  test('Message should be shown by setting isPrivate explicit to false', () => {
    render(<MessageItem message={fakeMessage} isPrivate={false}/>)
    expect(screen.queryByText(fakeMessage)).toBeInTheDocument()
  })

  test('Message should be shown by using default props', () => {
    render(<MessageItem message={fakeMessage}/>)
    expect(screen.queryByText(fakeMessage)).toBeInTheDocument()
  })

  test('throws an error as message is required', () => {
    expect(() => render(<MessageItem />)).toThrow()
  }) 
})
