const allProfilesDiv = document.querySelector('.all-profiles-div');
const searchInput = document.querySelector('.search-input');

const loadProfiles = async () => {
  let data = await fetch('/profiles/profiles.json');
  let profiles = await data.json();
  let sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name));

  sortedProfiles.forEach((profile) => {
    let profileDiv = document.createElement('div');

    profileDiv.innerHTML = `
      <a 
        <img onclick="redirectToProfile(this)" src="${profile.image}" /> 
      </a> 
      <p class="profile-name" onclick="redirect(this)">${profile.name}</p>
      <p class="profile-username" onclick="redirect(this)">${profile.username}</p>
    `;
    profileDiv.classList.add('profile-div');

    allProfilesDiv.append(profileDiv);
  });
};

searchInput.addEventListener('keyup', () => {
  if (searchInput.value.length > 0) {
    document.querySelectorAll('.profile-div').forEach((element) => {
      element.style.display = 'none';
    });
  }

  let profileNames = document.querySelectorAll('.profile-name');

  profileNames.forEach((element) => {
    if (
      element.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      console.log(element.innerText);
      element.parentElement.style.display = 'flex';
    }
  });
});

const getProfileUrl = (profile) => {
  const baseUrl = 'https://twitter.com/';
  const url = baseUrl + profile.username;

  return url;
}

loadProfiles();