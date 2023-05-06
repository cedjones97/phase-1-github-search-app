document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        searchUsers()
    })
    

})

function searchUsers(){
    fetch('https://api.github.com/users', {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }

    })
    .then(res => res.json())
    .then(users => users.forEach(user => render(user)))
}

function render(user){
   const userLi = document.createElement('li')
   const h1 = document.createElement('h1')
   h1.innerText = user.login.toUpperCase().charAt(0) + user.login.slice(1).toLowerCase()
   h1.addEventListener('click', ()=>{
    userRepo(user)
   })
   const userImg = document.createElement('img')
   userImg.src = user.avatar_url
   const p = document.createElement('p')
   p.innerHTML = `<a href=${user.html_url}> Visit my profile! </a>`
   userLi.append(h1, userImg, p)
   const userList = document.querySelector('#user-list')
   userList.appendChild(userLi)
    
}

function userRepo(user){
    console.log(user.repos_url)
    fetch(`${user.repos_url}`,{
        headers: {
        Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(repos => JSON.stringify(repos))
    .then(strRepo => strRepo.forEach(repo => {
    //     Object.keys()
        const repoLi = document.createElement('li')
        const reposList = document.querySelector('#repos-list') 
        repoLi.innerText = strRepo
        reposList.appendChild(repoLi)
     })) 

}
// function render(repo){
//     const userRepos = `${user.repos_url}`
//     console.log(userRepos)
//     const repoLi = document.createElement('li')
//     const reposList = document.querySelector('#repos-list')
//     repoLi.append(userRepos)
//     reposList.appendChild(repoLi)

// }