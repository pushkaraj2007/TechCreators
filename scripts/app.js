const allProfilesDiv = document.querySelector('.all-profiles-div');
const searchInput = document.querySelector('.search-input');

const loadProfiles = async () => {
  let data = await fetch('/profiles/profiles.json');
  let profiles = await data.json();
  let sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name));

  sortedProfiles.forEach((profile) => {
    let profileDiv = document.createElement('div');
    const profileUrl = getProfileUrl(profile);

    profileDiv.innerHTML = `
      <a href="${profileUrl}" target="_blank">
        <img src="${profile.image}" /> 
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

  profileNames.forEach((profileElement) => {
    if (
      profileElement.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      console.log(profileElement.innerText);
      profileElement.parentElement.style.display = 'flex';
    }
  });
});

const getProfileUrl = (profile) => {
  const baseUrl = 'https://twitter.com/';
  const url = baseUrl + profile.username;

  return url;
}

loadProfiles();
