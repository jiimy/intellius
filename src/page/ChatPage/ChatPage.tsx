import Chat from 'components/chat/Chat'
import ChatList from 'components/chat/ChatList'
import Header from 'components/header/Header'

const ChatPage = () => {
  return (
    <div>
      <Header/>
      <ChatList />
      <Chat />
    </div>
  )
}

export default ChatPage