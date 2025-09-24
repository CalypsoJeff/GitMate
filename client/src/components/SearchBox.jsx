import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [username, setUsername] = useState("");

  return (
    <div className="search-page">
      <h1 className="search-title">🔍 GitHub Explorer</h1>
      <p className="search-caption">
        Enter a GitHub username to view repositories, followers, and details.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => onSearch(username)}>Search</button>
      </div>
    </div>
  );
}
