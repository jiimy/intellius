import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { dayChat } from "util/day";
import "./chat.scss";

// const ChatList = ({ postId, upText }) => {
const ChatList = () => {
  const scroll = useRef(null);
  const [dataPage, setDataPage] = useState(0);
  const [dataSize, setDataSize] = useState(20);
  const [atBottom, setAtBottom] = useState(false);

  // const reversedList = data && [...data.content].reverse();
  // const message = useSelector((state) => state.chatStore);

  // const scrollToBottom = () => {
  //   if (scroll.current) {
  //     const scrollContainer = scroll.current;
  //     scrollContainer.scrollTop = scrollContainer.scrollHeight;
  //   }
  // };

  // const handleScroll = (e:any) => {
  //   if (scroll.current) {
  //     const scrollContainer = scroll.current;
  //     if (scrollContainer.scrollTop === 0 && e.deltaY < 0) {
  //       // console.log("스크롤이 맨 위에 있습니다.");
  //       setDataPage((prevCount) => prevCount - 1);
  //       setDataSize((prevCount) => prevCount + 10);
  //     } else {
  //     }
  //   }
  // };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;

    const scrollTop = event.currentTarget.scrollTop;
    console.log('scrollHeight', scrollHeight);
  };


  return (
    <>
      <div className="chat_wrap" onScroll={scrollHandler} 
      // onWheel={(e) => handleScroll(e)}
      >
        <div className="chat_list">
          
        </div>
      </div>
    </>
  );
};

export default ChatList;
