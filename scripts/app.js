const allProfilesDiv = document.querySelector('.all-profiles-div');
const searchInput = document.querySelector('.search-input');
const themeToggleBtn = document.querySelector('.rounded');
const themeToggleIcon = document.querySelector('.fa-solid');
const noProfileDiv = document.querySelector('.no-profile-div');
const defaultImage = "https://res.cloudinary.com/djxkmpkuq/image/upload/v1680859085/R_kcyx7x.png";

/**
 * Redirects to the specified profile URL in a new tab.
 * @param {string} url - The URL to open.
 */
const redirect = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Fetches, sorts, and displays all profiles from the JSON file.
 */
const loadProfiles = async () => {
  try {
    const data = await fetch('/profiles/profiles.json');
    const profiles = await data.json();
    // Sort profiles alphabetically by name
    const sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name));

    sortedProfiles.forEach((profile) => {
      const profileDiv = document.createElement('div');
      const profileUrl = `https://twitter.com/${profile.username}`;

      // We now call redirect() directly with the URL for cleaner code
      profileDiv.innerHTML = `
        <a href="${profileUrl}" target="_blank" rel="noopener noreferrer">
          <img src="${profile.image}" alt="${profile.name}'s profile picture" onerror="this.onerror=null; this.src='${defaultImage}';"/> 
        </a> 
        <p class="profile-name" onclick="redirect('${profileUrl}')">${profile.name}</p>
        <p class="profile-username" onclick="redirect('${profileUrl}')">@${profile.username}</p>
        <a href="${profileUrl}" target="_blank" rel="noopener noreferrer"><button>Follow</button></a> 
      `;
      profileDiv.classList.add('profile-div');
      allProfilesDiv.append(profileDiv);
    });
  } catch (error) {
    console.error("Failed to load profiles:", error);
    noProfileDiv.innerText = "Could not load profiles. Please try again later.";
    noProfileDiv.style.display = 'flex';
  }
};

/**
 * Filters profiles based on search input (searches both name and username).
 */
const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const profileDivs = document.querySelectorAll('.profile-div');
  let visibleProfiles = 0;

  profileDivs.forEach((profile) => {
    const name = profile.querySelector('.profile-name').innerText.toLowerCase();
    const username = profile.querySelector('.profile-username').innerText.toLowerCase();
    
    // Show profile if name or username includes the search term
    if (name.includes(searchTerm) || username.includes(searchTerm)) {
      profile.style.display = 'flex';
      visibleProfiles++;
    } else {
      profile.style.display = 'none';
    }
  });

  // Show/hide the 'No profile to show' message
  noProfileDiv.style.display = visibleProfiles === 0 ? 'flex' : 'none';
};

/**
 * Toggles the color theme between light and dark mode.
 */
const toggleTheme = () => {
  document.body.classList.toggle('night-mode');
  
  // Update the icon based on the new theme
  if (document.body.classList.contains('night-mode')) {
    themeToggleIcon.classList.remove('fa-sun');
    themeToggleIcon.classList.add('fa-moon');
    themeToggleBtn.classList.remove('background-sun');
    themeToggleBtn.classList.add('background-moon');
  } else {
    themeToggleIcon.classList.remove('fa-moon');
    themeToggleIcon.classList.add('fa-sun');
    themeToggleBtn.classList.remove('background-moon');
    themeToggleBtn.classList.add('background-sun');
  }
};

// --- Event Listeners ---
searchInput.addEventListener('keyup', handleSearch);
themeToggleBtn.addEventListener('click', toggleTheme);

// --- Initial Load ---
loadProfiles();