import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const LoginSuccess = () => {
  const { setToken } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let token = query.get("token");

    if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      token = localStorage.getItem("token");
    }

    if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login", { replace: true });
    } else {
      setToken(token); // <-- update context token here triggers fetchUser
      navigate("/", { replace: true });
    }
  }, [location.search, setToken, navigate]);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
