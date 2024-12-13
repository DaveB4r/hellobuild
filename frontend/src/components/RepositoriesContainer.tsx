import { useEffect, useState } from "react";
import { IRepository } from "../interfaces/IRepository";
import RepositoryCard from "./RepositoryCard";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useAppContext } from "../AppProvider";

type Props = {
  repositories: IRepository[];
};

const RepositoriesContainer = ({ repositories }: Props) => {
  const { userSession, favorites} = useAppContext();

  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const myFavorites = favorites.filter((favorite:any) => favorite.email === userSession.email);
    if(myFavorites.length > 0){
      setFavs(myFavorites[0].favorites);
    }
  }, [favorites])

  const [tab, setTab] = useState("Repositories");
  
  return (
    <div className="w-full col-span-2">
      <div className="flex justify-start gap-4 mb-2">
        <div
          className={`${
            tab === "Repositories"
              ? "text-blue-400 font-bold border-b border-b-blue-400"
              : "text-white hover:text-blue-400"
          } cursor-pointer flex justify-start items-center gap-1`}
          onClick={() => setTab("Repositories")}
        >
          <MdOutlineBookmarkBorder />
          Repositories
        </div>
        <div
          className={`${
            tab === "Favorites"
              ? "text-blue-400 font-bold border-b border-b-blue-400"
              : "text-white hover:text-blue-400"
          } cursor-pointer flex justify-start items-center gap-1`}
          onClick={() => setTab("Favorites")}
        >
          <FaStar/>
          Favorites
        </div>
      </div>
      <div className="md:grid grid-cols-2 repos  gap-4 w-full max-h-[500px] overflow-y-scroll">
        {repositories &&
          repositories.map((repo) => (
            tab === 'Favorites' ?
            favs.includes(repo.id) && <RepositoryCard key={repo.id} repo={repo} favs={favs}/>
            : <RepositoryCard key={repo.id} repo={repo} favs={favs}/>
          ))}
      </div>
    </div>
  );
};

export default RepositoriesContainer;
