import { getChatListApi, setChatListApi } from "api/chat";
import { ScrollToBottom } from "hooks/useScrollToBottom";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { dayChat } from "util/day";
import "./chat.scss";
import { useMutation } from "@tanstack/react-query";

type data = {
  answer: string
  create_ate: string
  question: string
}
const ChatList = () => {
  const token = useSelector((state: RootState) => state.user).atk;
  const chatlist = useSelector((state: RootState) => state.chat).chatlist

  const scroll = useRef<HTMLDivElement>(null);
  const [dataPage, setDataPage] = useState(1);
  const [tempData, setTempData] = useState<data[]>([]);
  const [lastData, setLastData] = useState(['0']);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (token) {
      const res = getChatListApi(dataPage)
      res.then((res) => {
        setTempData((prevData) => [res.content.reverse(), ...prevData]);
        setLastData(res.content);
        if (flag) {
          setTimeout(() => {
            ScrollToBottom(scroll);
          }, 0);
          setFlag(false);
        }
      })
    }
  }, [dataPage])

  useEffect(() => {
    ScrollToBottom(scroll);
  }, [chatlist])

  const handleScroll = (e: any) => {
    if (scroll.current) {
      const scrollContainer = scroll?.current;
      if (scrollContainer.scrollTop === 0 && e.deltaY < 0) {
        if (lastData.length !== 0) {
          setDataPage((prevCount) => prevCount + 1);
        }
      }
    }
  };

  const saveChat = useMutation({
    mutationFn: (data: any) => setChatListApi(data.question, data.answer),
    onSuccess: () => {
      alert('저장되었습니다');
    }
  })

  const onSave = (question: string, answer: string) => {
    const data = {
      question: question,
      answer: answer
    }
    saveChat.mutate(data)
  }

  const showlog = () => {
    let currentDate = '';

    return tempData.map((item: any) => item.map((chat: any, index: any) => {
      const formattedDate = new Date(chat.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (index >= 1) {
        if (formattedDate !== currentDate) {
          currentDate = formattedDate;
          return (
            <React.Fragment key={index}>
              <div className="center-date">{formattedDate}</div>
              <div className="chat-text">
                <div className="question">
                  <span className="time">{dayChat(chat.created_at)}</span>
                  <div className="text">{chat.question}</div>
                </div>
                <div className="answer">
                  <div className="profile"></div>
                  <div className="text-wrap">
                    <strong>상담챗봇</strong>
                    <div className="text">{chat.answer}</div>
                  </div>
                  <span className="time">{dayChat(chat.created_at)}</span>
                </div>
              </div>
            </React.Fragment>
          );
        }

        // 첫 1회 메시지
        return (
          <div key={index} className="chat-text">
            <div className="question">
              <span className="time">{dayChat(chat.created_at)}</span>
              <div className="text">{chat.question}</div>
            </div>
            <div className="answer">
              <div className="profile"></div>
              <div className="text-wrap">
                <strong>상담챗봇</strong>
                <div className="text">{chat.answer}</div>
              </div>
              <span className="time">{dayChat(chat.created_at)}</span>
            </div>
          </div>
        );
      }
    }));
  }

  return (
    <>
      <div className="chat_wrap" onWheel={(e) => handleScroll(e)} ref={scroll}
      >
        <div className="chat_list">
          {!token && <>대화내용이 없습니다. 로그인을 해주세요</>}
          {/* 이전 메시지 */}
          {lastData.length === 0 &&
            <div>마지막 대화 내용입니다. </div>
          }
          {showlog()}
          {/* 추가된 메시지 */}
          {chatlist.map((item, index) => (
            <div className="chat-text new" key={index} onClick={(e) => {
              e.preventDefault();
              onSave(item.question, item.answer)
            }}>
              <div className="question">
                <div className="text">{item.question}</div>
              </div>
              <div className="answer">
                <div className="profile"></div>
                <div className="text-wrap">
                  <strong>상담챗봇</strong>
                  <div className="text">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
