export default function RepoDetails({ repo }) {
  return (
    <div className="repo-details">
      {/* Left side: avatar + categories */}
      <div className="repo-left">
        <img src={repo.owner.avatar_url} alt="owner avatar" className="repo-avatar-large" />

        <div className="verified">
          <span>✅ Verified by GitHub</span>
          <p>GitHub confirms that this app meets the requirements for verification.</p>
        </div>

        <div className="categories">
          <h4>Categories</h4>
          <div className="tags">
            {repo.topics && repo.topics.length > 0 ? (
              repo.topics.map((topic, idx) => (
                <span key={idx} className="tag">{topic}</span>
              ))
            ) : (
              <>
                <span className="tag">Code review</span>
                <span className="tag">IDEs</span>
                <span className="tag">Free</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right side: repo info */}
      <div className="repo-right">
        <p className="app-label">Application</p>
        <h2>{repo.name}</h2>

        <a href={repo.html_url} target="_blank" rel="noreferrer" className="github-link">
          Set up a plan
        </a>

        <p className="repo-description">
          <strong>{repo.name}</strong> is a project by{" "}
          <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
            {repo.owner.login}
          </a>.
        </p>

        {repo.description && <p>{repo.description}</p>}

        <p>
          Language: <strong>{repo.language || "N/A"}</strong> | ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}
        </p>
        <p>
          Created: {new Date(repo.created_at).toLocaleDateString()} | Updated: {new Date(repo.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
