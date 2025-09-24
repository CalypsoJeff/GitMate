export default function FollowersList({ followers, onSelect, username }) {
  return (
    <div className="followers-section">
      <h2>
        Followers of <span className="highlight">{username}</span>
      </h2>
      <div className="followers-list">
        {followers.length === 0 ? (
          <p>No followers found.</p>
        ) : (
          followers.map((f) => (
            <div
              key={f.id}
              className="follower-card"
              onClick={() => onSelect(f)}
            >
              <img src={f.avatar_url} alt="avatar" />
              <h4>{f.login}</h4>
              <button>View Profile</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
