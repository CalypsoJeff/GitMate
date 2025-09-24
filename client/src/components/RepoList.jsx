import { useState } from "react";

export default function RepoList({ repos, onSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 8;

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);

  return (
    <div className="repo-list-container">
      <div className="repo-grid">
        {currentRepos.map((repo) => (
          <div
            key={repo.id}
            className="repo-card"
            onClick={() => onSelect(repo)}
          >
            <div className="repo-icon">
              <img src={repo.owner.avatar_url} alt="avatar" />
            </div>
            <div className="repo-content">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination pinned at bottom */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
