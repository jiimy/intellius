import { getChatListApi, setChatListApi } from "api/chat";
import { ScrollToBottom } from "hooks/useScrollToBottom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { dayChat } from "util/day";
import "./chat.scss";
import isEqual from 'lodash/isEqual';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SET_CHAT } from "store/chat";

type data = {
  answer: string
  create_ate: string
  question: string
}
const ChatList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.user).atk;
  const chatState = useSelector((state: RootState) => state.chat).chatState;

  const scroll = useRef<HTMLDivElement>(null);
  const [dataPage, setDataPage] = useState(1);
  const [tempData, setTempData] = useState<data[]>([]);
  const [lastData, setLastData] = useState(['0']);
  const [flag, setFlag] = useState('');

  type ItemType = {
    answer: string;
    question: string;
    created_at: string;
  }
  const [array, setArray] = useState<ItemType[]>([]);

  const { data, isSuccess, isLoading, isFetched, isRefetching, isFetching, isStale } = useQuery({
    queryKey: ['chatlist', { page: dataPage }],
    queryFn: () => getChatListApi(dataPage),
    enabled: token !== null,
  })

  useEffect(() => {
    if (data?.content.length > 0) {
      setFlag(data?.content[0]?.created_at);
    }
    if (isSuccess && !isLoading) {
      setTempData((prevData) => [data?.content.reverse(), ...prevData]);
      setLastData(data?.content);
    }
  }, [isSuccess, dataPage])



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

  // 메시지 발송 후 리스트 정리하기
  useEffect(() => {
    if (flag !== data?.content[0]?.created_at && data?.content[0] !== undefined) {
      setArray((prevData) => [...prevData, data?.content[0]])
    }
    if (chatState) {
      setTimeout(() => {
        ScrollToBottom(scroll);
      }, 10);
    }
    return () => {
      setArray([]);
    }
  }, [chatState, data])

  useEffect(() => {
    if (tempData?.length === 1 && array.length === 0) {
      ScrollToBottom(scroll);
    }

    if (chatState) {
      if (array.length > 0) {
        ScrollToBottom(scroll);
        dispatch(SET_CHAT(false));
      }
    }
  }, [array.length, tempData?.length, chatState])

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
          {isLoading && token && <div>불러오는중..</div>}
          {showlog()}

          {array.length > 0 &&
            array.map((chat, index) => (
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
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ChatList;
