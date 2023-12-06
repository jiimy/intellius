import React, { useState, useEffect, useRef } from "react";
import "./chat.scss";
import Button from "components/button/Button";
import { MessageButton34 } from "components/images";

// const ChatInput = ({ setText, onClick }) => {
const ChatInput = () => {
  const textarea = useRef();
  const [inputText, setInputText] = useState("");
  const [lastSentMessage, setLastSentMessage] = useState("");

  const click = (e: any) => {
    e.preventDefault();
    setLastSentMessage(inputText);

    if (inputText === lastSentMessage) {
      alert("3초 이내에 동일한 메시지로 보낼수 없습니다.");
      setTimeout(() => {
        setLastSentMessage("");
      }, 3000);
    } else {
      // onClick(e, inputText);
      // setText(inputText);
      setInputText("");
      // textarea.current.focus();
    }
  };

  const onChange = (e: any) => {
    setInputText(e.target.value);
  };

  // window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);

  var keys = [];

  const keysPressed = (e: any) => {
    keys[e.keyCode] = true;
    // if (keys[16] && keys[13]) {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setInputText(inputText + "\n");
      // } else if (keys[13]) {
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (inputText !== '') {
        // click(e, inputText);
        setInputText("");
      }
      // onClick(e, inputText);
    }
  };

  function keysReleased(e: any) {
    keys[e.keyCode] = false;
  }

  return (
    <div className="chat_input">
      <form
      // onSubmit={(e) => {
      //   click(e, inputText);
      //   onClick(e, inputText);
      // }}
      >
        <input
          // type="text"
          placeholder="상냥이랑 대화하기"
          name=""
          id=""
          onChange={onChange}
          value={inputText}
          autoFocus
          // ref={textarea}
          onKeyDown={keysPressed}
        />
        <div
          className="chat-button"
          onClick={(e: any) => {
            e.preventDefault();
            // click(e, inputText);
          }}
        >
          {inputText ?
            <MessageButton34 fill='#7761FF' /> : <MessageButton34 />
          }
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
