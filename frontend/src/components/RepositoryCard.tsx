import { IRepository } from "../interfaces/IRepository";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useAppContext } from "../AppProvider";

type Props = {
  repo: IRepository;
  favs: string[]
};

const RepositoryCard = ({ repo, favs }: Props) => {
  const { userSession, dispatch } = useAppContext();

  const addFavorite = (id: string) => {
    dispatch({
      type: 'ADD_FAVORITE',
      value: {
        email: userSession.email,
        id
      }
    });
    console.log('Added to favorites')
  }

  return (
    <div className="flex flex-col border border-gray-700 mx-2 mt-1 h-[105px] p-3 rounded-lg flex-wrap">
      <div className="flex justify-start items-center gap-2">
        <MdOutlineBookmarkBorder />
        <a
          className="capitalize text-blue-500 font-bold text-sm"
          href={repo.url}
          target="_blank"
          title={repo.name}
        >
          {repo.name}
        </a>
        <div className="border border-gray-400 px-2 rounded-full">
          <small className="text-gray-400 text-xs">
            {repo.isPrivate ? "Private" : "Public"}
          </small>
        </div>
        <FaStar 
          className={`cursor-pointer ${favs.includes(repo.id) ? 'text-yellow-500' : ''}`}
          onClick={() => addFavorite(repo.id)}
        />
      </div>
      <small className="text-[12px] text-gray-400" title={repo.description}>{repo.description ? String(repo.description).substring(0, 40) : ''}...</small>
      <div className="flex justif-start items-center gap-2 mt-2"> 
        <div className="w-[10px] h-[10px] rounded-full" style={{
          backgroundColor: repo.primaryLanguage.color
        }}></div>
        <small>{repo.primaryLanguage.name}</small>
      </div>
    </div>
  );
};

export default RepositoryCard;
