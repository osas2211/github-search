const github = new Github;
const ui = new UI;

const form = document.querySelector("form");
const searchInput = document.querySelector(".searchInput");
const profile = document.querySelector(".profile")

form.addEventListener("submit", (e)=>{
    github.getData(searchInput.value).then((response)=>{
        if (searchInput.value !== ""){
            ui.showUser(profile, response.profile, response.repo);
            if (response.profile.message === "Not Found"){
                profile.innerHTML = `<div class='error'> User: "${searchInput.value}" Not Found ! <div>`;
            }
            searchInput.value = "";
        }
        else{
            profile.innerHTML = "<div class='error'> PLEASE INPUT A USERNAME ! <div>"
        }
        
    }).catch((err)=>{
        profile.innerHTML = "<div class='error'> NO INTERNET CONNECTION ! <div>";
    })


    e.preventDefault()
})
