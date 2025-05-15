import { useState } from 'react'
import ChatPrincipal from './components/chat/textchat'
import MessageTextBox from './components/chat/messagetextbox'
import './App.css'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='main-chat'>
      <ChatPrincipal />
      <MessageTextBox />
    </div>
  )
}

export default App
