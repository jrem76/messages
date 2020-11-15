import React, { useState } from "react"
import { func } from "prop-types"

import "./styles/MessageForm.css"

/**
 * Form to add message
 * @param Function submitForm function to use to save the new message.
 */

export const MessageForm = ({ submitForm }) => {
  const [message, setMessage] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    submitForm({
      message,
      isPrivate,
    })
  }

  return (<form onSubmit={handleSubmit} className="messageForm__container">
    <div className="messageForm__labelContainer">
      <span className="messageForm__labelLeft">Private message</span>
      <label className="switch">
        <input type="checkbox" onChange={event => setIsPrivate(event.target.checked)}/>
        <span className="slider round"></span>
      </label>
      <span className="messageForm__labelRight">Public message</span>
    </div>
    <textarea className="messageForm__textbox" onChange={ event => setMessage(event.target.value)} rows="5" cols="33"></textarea>
    <button className="messageForm__button" type="submit" disabled={message.length === 0}> Add Message </button>
  </form>)
}

MessageForm.propTypes = {
  submitForm: func.isRequired
}
