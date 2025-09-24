/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import UserInfo from "./components/UserInfo";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";
import FollowersList from "./components/FollowersList";
import AllUsersList from "./components/AllUsersList"; // ✅ Import
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [currentView, setCurrentView] = useState("search");
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch user and repos
  const fetchUser = async (username) => {
    try {
      const userRes = await axios.post(`${API_URL}/api/users/${username}`);
      setUser(userRes.data);

      const repoRes = await axios.get(`${API_URL}/api/users/${username}/repos`);
      setRepos(repoRes.data);

      setCurrentView("repos");
    } catch (err) {
      alert("User not found in DB or GitHub");
    }
  };

  // ✅ Delete user (soft delete)
  const deleteUser = async (username) => {
    try {
      await axios.delete(`${API_URL}/api/users/${username}`);
      alert(`${username} has been soft deleted`);
      setUser(null);
      setRepos([]);
      setFollowers([]);
      setSelectedRepo(null);
      setCurrentView("search");
    } catch (err) {
      alert("Error deleting user");
    }
  };

  // ✅ Fetch followers
  const fetchFollowers = async (username) => {
    try {
      const res = await axios.get(`${API_URL}/api/users/${username}/followers`);
      setFollowers(res.data);
      setCurrentView("followers");
    } catch (err) {
      alert("Error fetching followers");
    }
  };

  return (
    <div className="app-container">
      {currentView === "search" && (
        <>
          <SearchBox onSearch={fetchUser} />
          <button onClick={() => setCurrentView("allUsers")}>
            📋 View All Users
          </button>
        </>
      )}

      {currentView === "repos" && (
        <>
          <UserInfo
            user={user}
            onFollowersClick={() => fetchFollowers(user.login)}
            onDelete={() => deleteUser(user.login)} 
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
            username={user.login}
            onSelect={(f) => fetchUser(f.login)}
          />
          <button onClick={() => setCurrentView("repos")}>🔙 Back</button>
        </>
      )}

      {currentView === "allUsers" && (
        <>
          <AllUsersList API_URL={API_URL} onSelect={fetchUser} />
          <button onClick={() => setCurrentView("search")}>🔙 Back</button>
        </>
      )}
    </div>
  );
}

export default App;
