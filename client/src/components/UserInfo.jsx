export default function UserInfo({ user, onFollowersClick, onDelete }) {
  return (
    <div className="user-info">
      <img src={user.avatar_url} alt="avatar" width="80" />
      <div>
        <h2>
          {user.name} ({user.login})
        </h2>
        <p>{user.bio}</p>
        <p>
          Repos: {user.public_repos} | Followers: {user.followers} | Following:{" "}
          {user.following}
        </p>
        <button onClick={onFollowersClick}>View Followers</button>
        <button
          onClick={onDelete}
          style={{ marginLeft: "10px", background: "red" }}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
