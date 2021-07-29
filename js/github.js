class Github {

    async getData(user){
        const response_profile = await fetch(`https://api.github.com/users/${user}`);
        const profile = await response_profile.json();
        const response_repo = await fetch(`https://api.github.com/users/${user}/repos?per_page=05&sort=created:asc`);
        const repo = await response_repo.json();

        return {
            'profile': profile,
            'repo': repo
        }
    }
}


class UI{
    showUser(target, profile, repo){
        let repo_output = "";
        const profile_repos = document.createElement("div");
        profile_repos.className = "profile__tech--repos"
        const profile_repos_head = document.createElement("div");
        profile_repos_head.className = "profile__bio--name head";
        profile_repos_head.innerHTML = "lastest Repos";
        profile_repos.appendChild(profile_repos_head);
        const repos = document.createElement("div");
        repos.className = "repo_container";
        repo.forEach((data)=>{
            repo_output += `
                <div class = "repo">
                    <div class="repo-name"><a href="${data.html_url}", target = "_blank">${data.name}</a></div>
                    <div class="stars">Stars: ${data.stargazers_count}</div>
                    <div class="created">Created: ${data.created_at.slice(0,10)}</div>
                </div>
            `
        })
        repos.innerHTML = repo_output;
        profile_repos.appendChild(repos)


        target.innerHTML = `<div class="profile__bio">
        <div class="profile__bio--photo">
            <img src="${profile.avatar_url}" alt="Profile Photo" srcset="">
        </div>
        <h2 class="profile__bio--name">${profile.name}</h2>
        <div class="profile__bio--info">
            <p>
                ${profile.bio}
            </p> 
        </div>
        <a href="${profile.html_url}" class="btn", target = "_blank">View profile</a>
    </div>
    
    <div class="profile__tech">
        <div class="profile__tech--info">
            <div class="profile__bio--name head">
                User Information
            </div>
            <div class="info-grid">
                <div class="followers"><span>Followers:</span>  ${profile.followers}</div>
                <div class="following"><span>Following:</span>  ${profile.following}</div>
                <div class="joined"><span>Joined:</span>${profile.created_at.slice(0,10)}</div>
                <div class="public-repos"><span>Public repos:</span>  ${profile.public_repos}</div>
                <div class="blog"><span>Blog:</span> <a href ="${profile.blog}"
                    style="color: #4D9078"; text-decoration: none>visit blog</a> </div>
                <div class="location"><span>Location:</span>  ${profile.location}</div>
            </div>
        </div>
        <div class="profile__tech--repos"> ${profile_repos.innerHTML} </div>
        
    </div>
    `
    }
}