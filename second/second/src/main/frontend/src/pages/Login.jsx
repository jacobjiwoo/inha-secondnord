import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <input type="text" />
      <input type="password" />
      <button type="button" onClick={() => navigate("/join")}>
        회원가입
      </button>
    </>
  );
}

export default Login;
