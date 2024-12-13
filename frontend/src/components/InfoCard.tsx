import { FaUsers, FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useAppContext } from "../AppProvider";

type Props = {
  avatar: string;
  login: string;
  username: string;
  bio: string;
  followers: string;
  following: string;
  company: string;
  location: string;
};

const InfoCard = ({avatar, login, username, bio, followers, following, company, location}: Props) => {
  const { dispatch } = useAppContext();
  const logout = () => {
    dispatch({
      type: 'USER_LOGOUT'
    });
    window.location.href = '/login';
  }

  return (
    <div className="info p-4">
      <img
        src={avatar}
        alt={login}
        width={250}
        className="rounded-full border border-gray-400"
      />
      <h3 className="text-3xl">{username}</h3>
      <p className="text-xl text-gray-400 mb-2 font-thin">{login}</p>
      <p className="my-2">{bio}</p>
      <div className="flex justify-start gap-2 items-center w-full">
        <FaUsers />
        {" " + followers + " "}
        <small className="text-gray-400">followers</small>
        {" · " + following + " "}
        <small className="text-gray-400">following</small>
      </div>
      <p></p>
      <div className="flex justify-start gap-2 items-center w-full">
        <FaBuilding />
        {company}
      </div>
      <div className="flex justify-start gap-2 items-center w-full">
        <FaLocationDot />
        {location}
      </div>
      <div className="mt-2">
        <button 
        className="text-white bg-red-500 rounded-lg p-2"
        onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
