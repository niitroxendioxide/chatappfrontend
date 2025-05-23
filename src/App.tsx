import { useState } from 'react'
import ChatPrincipal from './components/chat/textchat'
import MessageTextBox from './components/chat/messagetextbox'
import './App.css'
import UserList from './components/chat/userlist'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <div className='main-chat'>
        <h2>Global Chat</h2>
        <ChatPrincipal />
        <MessageTextBox />
      </div>
      <div className='side-bar'>
        <UserList />
      </div>
    </div>
  )
}

export default App
