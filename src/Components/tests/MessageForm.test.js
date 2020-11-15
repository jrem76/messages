import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MessageForm } from "../MessageForm"

describe('MessageFormTest:', () => {
  const mockSubmitForm = jest.fn()
  test("Add message button is disabled when message is empty", async () => {
    render(<MessageForm submitForm={mockSubmitForm} />)

    expect(screen.getByRole("button")).toBeDisabled()
  })

  test("Add message workflow", async () => {
    render(<MessageForm submitForm={mockSubmitForm} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Test' },
    })

    expect(screen.getByRole('textbox').value).toBe('Test')

    await userEvent.click(screen.getByRole('button'))

    expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  })
})