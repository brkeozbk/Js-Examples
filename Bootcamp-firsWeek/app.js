//setTimeout(() => {},100000);

const githubForm = document.getElementById("form_control");
const nameInput = document.getElementById("textSearch");
const github = new Github();
const arayuz = new Arayuz();
EventListener();
function EventListener(){
    githubForm.addEventListener("submit",getData);
    

}

function getData(e){
    
    let username = nameInput.value.trim();
    if(username===""){
        alert("Kullanıcı adı yanlış girdiniz")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message==="bulunamadı"){
               arayuz.showError("Böyle bir kullanıcı yok")

            }
            else{
               arayuz.showUserInfo(response.user);
               arayuz.showRepoInfo(response.repo);

            }

        })
        .catch(err => console.log(err));

    }
    arayuz.clearInput();
    e.preventDefault();
}