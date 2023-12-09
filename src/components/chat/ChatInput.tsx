import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChatListApi, setChatListApi } from "api/chat";
import { MessageButton34 } from "components/images";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_CHAT } from "store/chat";
import "./chat.scss";

// const ChatInput = ({ setText, onClick }) => {
const ChatInput = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const textarea = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [inputRock, setInputRock] = useState(false);

  const postChat = useMutation({
    mutationFn: (data: any) => postChatListApi(data),
    onSuccess: (res: any) => {
      setInputRock(false);
      setInputText("");
      postDbChat.mutate(res);
    }
  })

  const postDbChat = useMutation({
    mutationFn: (data: any) => setChatListApi(data.question, data.answer),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["chatlist", { page: 1 }] });
      dispatch(SET_CHAT(true))
      setTimeout(() => {
        if (textarea.current) {
          textarea?.current.focus();
        }
      }, 0);
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setInputRock(true);
    postChat.mutate(inputText)
  }

  const handleChange = (e: any) => {
    const text = e.target.value;
    setInputText(text)
  }

  return (
    <div className="chat_input">
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={inputRock ? "로딩중.." : "상냥이랑 대화하기"}
          name=""
          id=""
          onChange={handleChange}
          value={inputText}
          autoFocus
          ref={textarea}
          disabled={inputRock}
        />
        <button
          className="chat-button"
          type="submit"
        >
          {inputText ?
            <MessageButton34 fill='#7761FF' /> : <MessageButton34 />
          }
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
