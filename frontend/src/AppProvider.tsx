import { createContext, ReactNode, useContext, useReducer } from "react";

const AppContext = createContext({});

const useAppContext = () => {
  return useContext(AppContext);
};

const USERS = JSON.parse(String(localStorage.getItem("users")));
const USERSESSION = JSON.parse(String(localStorage.getItem("userSession")));
const REPOSITORIES = JSON.parse(String(localStorage.getItem("repositories")));
const FAVORITES = JSON.parse(String(localStorage.getItem("favorites")));
let r = 0;

const initialState = {
  users: USERS ? USERS : [],
  userSession: USERSESSION ? USERSESSION : null,
  repositories: REPOSITORIES
    ? REPOSITORIES
    : [
        {
          email: "",
          repositories: [
            {
              id: "",
              name: "",
              url: "",
              description: "",
              isPrivate: false,
              primaryLanguage: {
                name: "",
                color: "",
              },
            },
          ],
        },
      ],
  favorites: FAVORITES ? FAVORITES : [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_USER":
      const users = JSON.parse(String(localStorage.getItem("users")));
      let index;
      if (users) {
        index = users.findIndex(
          (user: any) => user.email === action.value.email
        );
      }
      if (index === -1 || !users) {
        localStorage.setItem(
          "users",
          JSON.stringify([...state.users, action.value])
        );
      }
      return {
        ...state,
        users: JSON.parse(String(localStorage.getItem("users"))),
      };

    case "USER_LOGIN":
      localStorage.setItem("userSession", JSON.stringify(action.value));
      return {
        ...state,
        userSession: JSON.parse(String(localStorage.getItem("userSession"))),
      };

    case "USER_LOGOUT":
      localStorage.removeItem("userSession");
      return {
        ...state,
        userSession: initialState.userSession
      }

    case "ADD_TOKEN":
      const user = JSON.parse(String(localStorage.getItem("userSession")));
      user.userSession.token = action.value;
      localStorage.setItem("userSession", JSON.stringify(user.userSession));
      return {
        ...state,
        userSession: JSON.parse(String(localStorage.getItem("userSession"))),
      };

    case "ADD_FAVORITE":
      r++;
      if (r % 2 !== 0) {
        if (state.favorites.length === 0) {
          localStorage.setItem(
            "favorites",
            JSON.stringify([
              {
                email: action.value.email,
                favorites: [action.value.id],
              },
            ])
          );
        } else {
          const favs = state.favorites.find(
            (favorite: any) => favorite.email === action.value.email
          );
          if (favs) {
            const favIndex = favs.favorites.indexOf(action.value.id);
            if (favIndex < 0) {
              localStorage.setItem(
                "favorites",
                JSON.stringify([
                  {
                    email: action.value.email,
                    favorites: [...favs.favorites, action.value.id],
                  },
                ])
              );
            } else {
              favs.favorites.splice(favIndex, 1);
              console.log(favIndex, action.value.id, favs);
              localStorage.setItem(
                "favorites",
                JSON.stringify([
                  {
                    email: action.value.email,
                    favorites: [...favs.favorites],
                  },
                ])
              );
            }
          }else {
            localStorage.setItem(
              "favorites",
              JSON.stringify([
                ...state.favorites,
                {
                  email: action.value.email,
                  favorites: [action.value.id]
                }
              ])
            )
          }
        }
      }
      return {
        ...state,
        favorites: JSON.parse(String(localStorage.getItem("favorites"))),
      };

    default:
      break;
  }
  return state;
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        users: state.users,
        userSession: state.userSession,
        repositories: state.repositories,
        favorites: state.favorites,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
