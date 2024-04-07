// Wait for the DOM content to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the HTML elements we'll be interacting with
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repo-list");

    // Add event listener to the search form for form submission
    searchForm.addEventListener("submit", event => {
        event.preventDefault(); // Prevent default form submission behavior
        const searchTerm = searchInput.value.trim(); // Get the search term from the input field
        if (searchTerm !== "") {
            searchUsers(searchTerm); // Call function to search for users
        }
    });

    // Function to search for users using GitHub API
    function searchUsers(searchTerm) {
        const url = `https://api.github.com/search/users?q=${searchTerm}`; // Construct API endpoint URL

        // Fetch data from GitHub API
        fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json" // Set custom header as per GitHub API documentation
            }
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            displayUsers(data.items); // Call function to display users on the page
        })
        .catch(error => console.error("Error fetching users:", error)); // Log any errors to the console
    }

    // Function to display searched users on the page
    function displayUsers(users) {
        userList.innerHTML = ""; // Clear previous search results
        users.forEach(user => {
            const userItem = document.createElement("li"); // Create list item for each user
            const userLink = document.createElement("a"); // Create anchor element for user link
            userLink.href = user.html_url; // Set href attribute to user's GitHub profile URL
            userLink.textContent = user.login; // Set text content to user's username
            userItem.appendChild(userLink); // Append anchor element to list item
            userList.appendChild(userItem); // Append list item to user list
            // Add event listener to user link to fetch user repositories when clicked
            userLink.addEventListener("click", () => {
                fetchUserRepos(user.login); // Call function to fetch user repositories
            });
        });
    }

    // Function to fetch repositories for a specific user using GitHub API
    function fetchUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`; // Construct API endpoint URL

        // Fetch data from GitHub API
        fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json" // Set custom header as per GitHub API documentation
            }
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            displayUserRepos(data); // Call function to display user repositories on the page
        })
        .catch(error => console.error("Error fetching user repos:", error)); // Log any errors to the console
    }

    // Function to display user repositories on the page
    function displayUserRepos(repos) {
        repoList.innerHTML = ""; // Clear previous repository list
        repos.forEach(repo => {
            const repoItem = document.createElement("li"); // Create list item for each repository
            const repoLink = document.createElement("a"); // Create anchor element for repository link
            repoLink.href = repo.html_url; // Set href attribute to repository's GitHub URL
            repoLink.textContent = repo.name; // Set text content to repository name
            repoItem.appendChild(repoLink); // Append anchor element to list item
            repoList.appendChild(repoItem); // Append list item to repository list
        });
    }
});
