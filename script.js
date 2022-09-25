const allProfilesDiv = document.querySelector('.all-profiles-div')
const searchInput = document.querySelector('.search-input')

const func = async ()=>{
    let data = await fetch('/profiles/profiles.json')
    let profiles = await data.json()
    let sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name))

    sortedProfiles.forEach(element => {
        let profile_div = document.createElement('div')
        profile_div.innerHTML = `<img onclick="redirect(this)" src="${element.image}" /> </a> <p class="profile-name" onclick="redirect(this)">${element.name}</p> <p class="profile-username" onclick="redirect(this)">${element.username}</p>`
        profile_div.classList.add('profile-div')
        allProfilesDiv.append(profile_div)
    });
    console.log(profiles)
    console.log(sortedProfiles)
}

func()

searchInput.addEventListener('keyup', ()=>{
    if(searchInput.value.length > 0){
        document.querySelectorAll('.profile-div').forEach(element => {
            element.style.display = 'none'
        });
    }

    let profileNames = document.querySelectorAll('.profile-name')
    profileNames.forEach(element => {
        if(element.innerText.toLowerCase().includes(searchInput.value.toLowerCase())){
            console.log(element.innerText)
            element.parentElement.style.display = 'flex'
        }
        
    });
})

const redirect = (btn)=>{
    location.href = `https://twitter.com/${btn.parentElement.children[2].innerText}`
}