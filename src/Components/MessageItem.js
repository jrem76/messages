import React from "react"
import { string, bool } from "prop-types"

import "./styles/MessageItem.css"

/**
 * This component has to show message only if the message isn't private
 * @param string message
 * @param boolean isPrivate
 */

export const MessageItem = ({ message, isPrivate }) => (
  !isPrivate && <p className="messageItem" data-testid="messageItem">{ message }</p>
)

MessageItem.propTypes = {
  message: string.isRequired,
  isPrivate: bool,
}

MessageItem.defaultProps = {
  isPrivate: false,
}