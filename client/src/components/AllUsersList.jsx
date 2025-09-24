import { useState, useEffect } from "react";
import axios from "axios";

export default function AllUsersList({ API_URL, onSelect }) {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("followers");
  const [order, setOrder] = useState("desc");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/users?sortBy=${sortBy}&order=${order}`
      );
      setUsers(res.data);
    } catch (err) {
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sortBy, order]);

  return (
    <div className="all-users">
      <h2>All Saved Users</h2>

      {/* Sorting Controls */}
      <div className="sort-controls">
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="followers">Followers</option>
          <option value="following">Following</option>
          <option value="public_repos">Repos</option>
          <option value="public_gists">Gists</option>
          <option value="created_at">Created Date</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* User Grid */}
      <div className="users-grid">
        {users.map((u) => (
          <div
            key={u._id}
            className="user-card"
            onClick={() => onSelect(u.login)}
          >
            <img src={u.avatar_url} alt="avatar" />
            <h4>{u.login}</h4>
            <p>Repos: {u.public_repos}</p>
            <p>Followers: {u.followers}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
