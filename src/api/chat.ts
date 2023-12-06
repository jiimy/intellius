import apiInstance from "util/useInterceptor";

// 채팅 목록
export async function getChatListApi(page: number, num?: number ) {
  const res = await apiInstance.get("/chatlogs", {
    params: {page: page, num: num}
  });
  return res;
}

// 채팅 보내기
export async function postChatListApi(question: string) {
  const res = await apiInstance.post("/chat", {
    question: question,
  });
  return res;
}

// 채팅 db에 저장하기
export async function setChatListApi(question: string, answer: string) {
  const res = await apiInstance.post("/chatlogs", {
    question: question,
    answer: answer,
  });
  return res;
}