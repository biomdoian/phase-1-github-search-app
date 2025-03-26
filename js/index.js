document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(query) {
      const searchUrl = `https://api.github.com/search/users?q=${query}`;
  
      fetch(searchUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error searching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = ''; 
      reposList.innerHTML = ''; 
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        listItem.addEventListener('click', () => fetchRepos(user.login));
        userList.appendChild(listItem);
      });
    }
  
    function fetchRepos(username) {
      const reposUrl = `https://api.github.com/users/${username}/repos`;
  
      fetch(reposUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(repos => {
          displayRepos(repos);
        })
        .catch(error => console.error(`Error fetching repos for ${username}:`, error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      const reposHeading = document.createElement('h3');
      reposHeading.textContent = 'Repositories:';
      reposList.appendChild(reposHeading);
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          ${repo.description ? `<p>${repo.description}</p>` : ''}
        `;
        reposList.appendChild(listItem);
      });
    }
  });