import React, { useEffect, useState } from "react";
import { FaGithub, FaFolder , FaRegFolder  } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const ProfilePage = () => {
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

  return (
    <Box>
      <h2>Profile</h2>
          {!token && (
          <Button  variant="contained" onClick={handleGitHubLogin} startIcon={<FaGithub size={20}/>}>
            Connect Github
          </Button> 
          )}
       {token && (    
        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Box>
          

              <Box sx={{ p: 2, border: 1, boxShadow: 6, borderColor: 'divider', borderRadius: 1, backgroundColor: '#b6d9f0' }}>
              <h3>Repositories</h3>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  sx={{ padding: 1 }}
                />
                <Divider />
                <List>
                  {results.map((repo) => (
                    <ListItem key={repo.id} sx={{
                      justifyContent: "space-between",
                      alignContent: 'flex-start'
                    }}>
                      <ListItemIcon>
                        <FaRegFolder  />
                      </ListItemIcon>
                      <ListItemText>
                        {repo.name}
                      </ListItemText>
                      
                      <Checkbox icon={<MdFavoriteBorder />} checkedIcon={<MdFavorite />} onClick={() => toggleFavorite(repo)} checked={favorites.includes(repo.id)} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            
          </Box>
          <Box sx={{ p: 2, border: 1, boxShadow: 6 , borderColor: 'divider', borderRadius: 1, backgroundColor: '#b6d9f0' }}>
              <h3>Favorites</h3>
                <Divider />
                <List>
                  {favoriteRepos.map((repo) => (
                    <ListItem key={repo.id}>
                      {repo.name}
                    </ListItem>
                  ))}
                </List>
              </Box>
        </Stack>
      )}
    </Box>
  );
};

export default ProfilePage;