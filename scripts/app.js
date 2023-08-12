const allProfilesDiv = document.querySelector('.all-profiles-div');
const searchInput = document.querySelector('.search-input');
const btn = document.querySelector('.rounded')
const btnIcon = document.querySelector('.fa-solid')
const defaultImage = "https://res.cloudinary.com/djxkmpkuq/image/upload/v1680859085/R_kcyx7x.png"





const loadProfiles = async () => {
  // await console.log("origional" , document.body.classList.contains('night-mode'))


  if (localStorage.getItem('mode') === 'light') {
    btn.classList.remove('background-moon')
    btnIcon.classList.remove('fa-moon')
    document.body.classList.remove('night-mode')

    
  } else {
    btn.classList.add('background-moon')
    btnIcon.classList.add('fa-moon')
    document.body.classList.add('night-mode')

  }





  let data = await fetch('/profiles/profiles.json');
  let profiles = await data.json();
  let sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name));

  sortedProfiles.forEach((profile) => {
    let profileDiv = document.createElement('div');
    let profileUrl = `https://twitter.com/${profile.username}`;

    profileDiv.innerHTML = `
      <a href="${profileUrl}" target="_blank">
        <img src="${profile.image}" onerror="this.onerror=null; this.src='${defaultImage}';"/> 
      </a> 
      <p class="profile-name" onclick="redirect(this)">${profile.name}</p>
      <p class="profile-username" onclick="redirect(this)">@${profile.username}</p>
      <a href="${profileUrl}" target="_blank"><button>Follow</button></a> 
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
  let visibleProfiles = 0;
  profileNames.forEach((profileElement) => {
    if (
      profileElement.innerText.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    ) {
      profileElement.parentElement.style.display = 'flex';
      visibleProfiles++;
    }
  });

  // if there is a profile to show, hide the no profile div
  if (visibleProfiles !== 0) {
    document.querySelector('.no-profile-div').style.display = 'none';
  } else {
    document.querySelector('.no-profile-div').style.display = 'flex';
  }
});

btn.addEventListener('click', e => {

  //   btn.classList.toggle('background-moon')
  // btnIcon.classList.toggle('fa-moon')
  //   document.body.classList.toggle('night-mode')
    
  //   console.log(document.body.classList.contains('night-mode'))

  if (document.body.classList.contains('night-mode')) {
    btn.classList.remove('background-moon')
    btnIcon.classList.remove('fa-moon')
    document.body.classList.remove('night-mode')
    localStorage.setItem('mode', 'light')
    
  } else {
    btn.classList.add('background-moon')
    btnIcon.classList.add('fa-moon')
    document.body.classList.add('night-mode')
    localStorage.setItem('mode', 'dark')
  }

 })

// load all profiles
loadProfiles();

