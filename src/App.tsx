
import ChatPrincipal from './components/chat/textchat'
import MessageTextBox from './components/chat/messagetextbox'
import UserList from './components/chat/userlist'
import NameApp from './components/chat/setusername'
import './App.css'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
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
