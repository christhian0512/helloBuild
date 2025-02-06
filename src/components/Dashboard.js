import React, { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const token = localStorage.getItem("github_token");

  useEffect(() => {
    if (token) {
      fetch("https://api.github.com/user/repos", {
        headers: { Authorization: `token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setRepos(data));
    }
  }, [token]);

  const toggleFavorite = (repo) => {
    const updatedFavorites = favorites.includes(repo.id)
      ? favorites.filter((id) => id !== repo.id)
      : [...favorites, repo.id];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleGitHubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user repo`;

  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleGitHubLogin}>
        <FaDiscord size={30} /> Log into GitHub
      </button>
      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            <button onClick={() => toggleFavorite(repo)}>
              {favorites.includes(repo.id) ? "Unfavorite" : "Favorite"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;