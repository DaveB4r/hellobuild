import { useEffect } from "react";
import { useAppContext } from "./AppProvider";

const Callback = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      getToken(code);
    }
  }, []);

  const getToken = async (code: any) => {
    try {
      const response = await fetch(
        `http://localhost:3000/auth/callback?code=${code}`
      );

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      const access_token = data?.access_token;
      if (access_token) {
        dispatch({
          type: "ADD_TOKEN",
          value: access_token,
        });
        window.location.href = '/profile';
      }
      return access_token;
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>
};

export default Callback;
