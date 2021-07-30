const github = new Github;
const ui = new UI;

const form = document.querySelector("form");
const searchInput = document.querySelector(".searchInput");
const profile = document.querySelector(".profile")

form.addEventListener("submit", (e)=>{
    github.getData(searchInput.value).then((response)=>{
        if (searchInput.value === ""){
            profile.innerHTML = "<div class='error'> PLEASE INPUT A USERNAME ! <div>"
        }
        else if (response.profile.message === "Not Found"){
            profile.innerHTML = `<div class='error'> USER: "${searchInput.value}" NOT FOUND ! </div>`;
        }
        else if (searchInput.value !== ""){
            ui.showUser(profile, response.profile, response.repo);
            searchInput.value = "";
        }
        
    }).catch((err)=>{
        profile.innerHTML = "<div class='error'> NO INTERNET CONNECTION ! <div>";
    })


    e.preventDefault()
})
