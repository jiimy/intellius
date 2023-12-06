import apiInstance from "util/useInterceptor";

// 로그인
export async function userLoginApi(email:string, password:string) {
  const res = await apiInstance.post("/token", {
    email: email,
    password: password,
  });
  return res;
}

