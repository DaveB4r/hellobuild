import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAppContext } from "../AppProvider";

type Props = {
  type: string;
};

const FormCard = ({ type }: Props) => {
  const { userSession, users, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(userSession) {
      navigate('/profile')
    }
  },[])
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "signup") {
      dispatch({
        type: "ADD_USER",
        value: {
          email,
          password,
        },
      });
      navigate("/login");
    } else {
      const userSession = users.find((user: any) => user.email === email && user.password === password);
      if(userSession) {
        dispatch({
          type: "USER_LOGIN",
          value: {
            userSession
          }
        })
        window.location.href = 'http://localhost:3000/auth/github';
      }else {
        setMessage("Email or password are wrong!")
        return false;
      }
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col items-center gap-4 border border-gray-400 p-6 rounded-xl"
        onSubmit={handleSubmit}
      >
        <img src="/images/logo.png" alt="logo" width={100} />
        <h2 className="text-2xl text-white font-bold">
          hellobuild Repositories
        </h2>
        <h3 className="text-xl text-white font-bold">
          {type === "signup" ? "Sign up" : "Login"}
        </h3>
        {message && 
          <p className="text-red-500 font-bold">{message}</p>
        }
        <div className="mb-2">
          <label htmlFor="email" className="text-white">
            <p>Email</p>
            <input
              className="text-black font-bold rounded-lg bg-gray-400"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="text-white">
            <p>Password</p>
            <input
              className="text-black font-bold rounded-lg bg-gray-400"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <button
            className="rounded-lg bg-blue-700 p-4 text-white font-bold w-[200px]"
            type="submit"
          >
            {type === "signup" ? "Sign up" : "Login"}
          </button>
        </div>
        {type === "signup" ? (
          <p className="text-md text-white">
            Do you already have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-md text-white">
            Don't you have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Signup
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default FormCard;
