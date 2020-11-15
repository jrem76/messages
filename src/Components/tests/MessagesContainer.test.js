import { render, screen, waitFor  } from '@testing-library/react'
import { MessagesContainer} from '../MessagesContainer'

const mockResponse = [
  {
    "id": 1,
    "isPrivate": false,
    "message": "Integer vehicula lacus velit, placerat tempor ligula convallis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam imperdiet quam eu congue varius. Maecenas rhoncus orci ut enim imperdiet tempor. Praesent vitae justo lectus. Pellentesque lobortis tincidunt quam eu eleifend. Duis ac lorem sagittis, efficitur lacus sit amet, iaculis mi. Ut dapibus ante elit, nec maximus lorem auctor in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec diam ut nisl vestibulum dignissim."
  },
]

describe('tests with empty array as api answer', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Api returns empty array', async () => {

    const fakeResponse = []
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes)
    global.fetch = mockedFetch
    const { getByTestId } = render(<MessagesContainer />)
    await waitFor(() => getByTestId('messagesContainer'))

    expect(screen.queryByTestId("messageItem")).toBeNull()
    expect(mockedFetch).toBeCalledTimes(1)
    expect(mRes.json).toBeCalledTimes(1)
  })

  test('Api returns elements', async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(mockResponse) }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes)
    global.fetch = mockedFetch
    const { getByTestId } = render(<MessagesContainer />)
    const divContainer = await waitFor(() => getByTestId('messagesContainer'))

    expect(getByTestId("messageItem")).toBeInTheDocument()
    expect(divContainer).toHaveTextContent(mockResponse[0].message)
    expect(mockedFetch).toBeCalledTimes(1)
    expect(mRes.json).toBeCalledTimes(1)
  })
})
