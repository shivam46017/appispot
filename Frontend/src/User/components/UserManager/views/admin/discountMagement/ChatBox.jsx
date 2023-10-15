import React from 'react'

function ChatBox(props) {

  return (
    <div className={`${props.sender === 0 ? "self-end bg-blue-800 text-white font-semibold" : "self-start bg-white text-blue-950"} shadow-xl drop-shadow-lg p-3 rounded-lg my-2 md:my-1 max-w-[55%] flex-wrap]`}>
        <span>{props.message}</span>
    </div>
  )
}

export default ChatBox