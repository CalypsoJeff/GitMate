export default function UserInfo({ user, onFollowersClick }) {
  return (
    <div className="user-info">
      <img src={user.avatar_url} alt="avatar" width="80" />
      <div>
        <h2>{user.name} ({user.login})</h2>
        <p>{user.bio}</p>
        <p>
          Repos: {user.public_repos} | Followers: {user.followers} | Following: {user.following}
        </p>
        <button onClick={onFollowersClick}>View Followers</button>
      </div>
    </div>
  );
}
