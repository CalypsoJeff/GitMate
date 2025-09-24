/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import UserInfo from "./components/UserInfo";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";
import FollowersList from "./components/FollowersList";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [currentView, setCurrentView] = useState("search");
  const [cache, setCache] = useState({});

  const fetchUser = async (username) => {
    if (cache[username]?.user) {
      setUser(cache[username].user);
      setRepos(cache[username].repos);
      setCurrentView("repos");
      return;
    }
    try {
      const userRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const repoRes = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const newData = { user: userRes.data, repos: repoRes.data };
      setCache((prev) => ({ ...prev, [username]: newData }));
      setUser(userRes.data);
      setRepos(repoRes.data);
      setCurrentView("repos");
    } catch (err) {
      alert("User not found");
    }
  };

  const fetchFollowers = async (username) => {
    if (cache[username]?.followers) {
      setFollowers(cache[username].followers);
      setCurrentView("followers");
      return;
    }
    const res = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    setFollowers(res.data);
    setCache((prev) => ({
      ...prev,
      [username]: { ...(prev[username] || {}), followers: res.data },
    }));
    setCurrentView("followers");
  };

  return (
    <div className="app-container">
      {currentView === "search" && <SearchBox onSearch={fetchUser} />}

      {currentView === "repos" && (
        <>
          <UserInfo
            user={user}
            onFollowersClick={() => fetchFollowers(user.login)}
          />
          <RepoList
            repos={repos}
            onSelect={(repo) => {
              setSelectedRepo(repo);
              setCurrentView("repoDetails");
            }}
          />
          <button onClick={() => setCurrentView("search")}>🔙 Back</button>
        </>
      )}

      {currentView === "repoDetails" && (
        <>
          <RepoDetails repo={selectedRepo} />
          <button onClick={() => setCurrentView("repos")}>
            🔙 Back to Repos
          </button>
        </>
      )}

      {currentView === "followers" && (
        <>
          <FollowersList
            followers={followers}
            username={user.login} // 👈 pass the current user
            onSelect={(f) => fetchUser(f.login)}
          />
          <button onClick={() => setCurrentView("repos")}>🔙 Back</button>
        </>
      )}
    </div>
  );
}

export default App;
