import React, { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("github_token");

  useEffect(() => {
  if (token) {
    const query = `
      {
        viewer {
          repositories(first: 100) {
            nodes {
              id
              name
            }
          }
        }
      }
    `;

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then((data) => setRepos(data.data.viewer.repositories.nodes))
      .catch((error) => console.error("Error fetching repositories:", error));
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

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
  ? repos
  : repos.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  const favoriteRepos = favorites
  ? repos.filter(repo =>
      favorites.includes(repo.id)
    ): [];

    console.log(favoriteRepos);

  return (
    <div>
      <h2>Dashboard</h2>
      {!token && (
      <Button  variant="contained" onClick={handleGitHubLogin}>
        <FaDiscord size={30} /> Log into GitHub
      </Button> 
      )}
      {token && (
        <>
          <h3>Repositories</h3>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <List>
            {results.map((repo) => (
              <ListItem key={repo.id}>
                {repo.name}
                <Button variant="outlined" onClick={() => toggleFavorite(repo)}>
                  {favorites.includes(repo.id) ? "Unfavorite" : "Favorite"}
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default Dashboard;