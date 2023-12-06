import { useMutation } from "@tanstack/react-query";
import { userLoginApi } from "api/user";
import Button from "components/button/Button";
import { InputCheck, InputText } from "components/input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "store/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const login = useMutation({
    mutationFn: (data: any) => userLoginApi(data.email, data.password),
    onSuccess: (res:any) => {
      reset();
      navigate(`/chat`);
      dispatch(SET_TOKEN({ atk: res.access_token }))
    }
  })

  const onSubmit = (data: any) => {
    login.mutate(data);
  };

  return (
    <div className="login-page">
      <div className="login-page__content">
        <div className="content">
          <div className="bubble">
            스마트한 선생님을 위한 <br />스마트한 청소년 위기관리 솔루션<br /> <span>상냥이</span>에 오신 걸 환영합니다! ☺️
            <div className="bubble-tail1"></div>
            <div className="bubble-tail2"></div>
          </div>
          <div className="cat"></div>
          <div className="line"></div>
          <div className="box1"></div>
          <div className="box2"></div>
          <div className="box3"></div>
        </div>
      </div>
      <div className="login">
        <div className="login__content">
          <div className="logo">
            <span>관리자</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText
              label="이메일"
              type="text"
              id="email"
              {...register("email", {
                required: "아이디는 필수 입력입니다.",
              })}
            />
            <InputText
              label="비밀번호"
              type="password"
              id="password"
              {...register("password", {
                required: "아이디는 필수 입력입니다.",
              })}
            />
            <InputCheck label="아이디 저장" id="idsave" />
            <Button full>로그인</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
