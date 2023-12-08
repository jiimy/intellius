import Chat from 'components/chat/Chat'
import ChatList from 'components/chat/ChatList'
import Header from 'components/header/Header';
import './chatpage.scss';

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <Header />
      <ChatList />
      <Chat />
    </div>
  )
}

export default ChatPage