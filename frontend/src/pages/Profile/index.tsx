import { useEffect, useState } from "react";
import { useAppContext } from "../../AppProvider";
import RepositoriesContainer from "../../components/RepositoriesContainer";
import InfoCard from "../../components/InfoCard";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const GITHUB_API_URL = "https://api.github.com/graphql";

const Profile = () => {
  const { userSession } = useAppContext();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(userSession) {
      getUserData(userSession.token);
    }else {
      navigate('/login')
    }
  },[])

  const getUserData = async (accessToken: string) => {
    const query = {
      query: `
        query {
          viewer {
            login
            avatarUrl
            name
            bio
            followers {
              totalCount
            }
            following {
              totalCount
            }
            company
            location            
          }
        }
      `,
    };

    try {
      const response = await fetch(GITHUB_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      const result = await response.json();
      setLogin(result.data.viewer.login);
      setAvatar(result.data.viewer.avatarUrl);
      setUsername(result.data.viewer.name);
      setBio(result.data.viewer.bio);
      setFollowers(result.data.viewer.followers?.totalCount);
      setFollowing(result.data.viewer.following?.totalCount);
      setCompany(result.data.viewer.company);
      setLocation(result.data.viewer.location);
      getRepositories(accessToken, result.data.viewer.login);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getRepositories = async (accessToken: string, username: string) => {
    try {
      const query = {
        query: `
          query {
            user(login: "${username}") {
              repositories(first: 100) {
                nodes {
                  id
                  name
                  url
                  description
                  isPrivate
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        `,
      };
      const response = await fetch(GITHUB_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const data = await response.json();
      setRepositories(data.data.user.repositories.nodes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching repositories", error);
    }
  };
  return (
    <div className="md:flex h-screen justify-center items-center">
      {!loading ? (
        <div className="md:grid md:grid-cols-3  container text-white p-6">
            <InfoCard
              avatar={avatar}
              login={login}
              username={username}
              bio={bio}
              followers={followers}
              following={following}
              company={company}
              location={location}
            />
            <RepositoriesContainer
              repositories={repositories}
            />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
