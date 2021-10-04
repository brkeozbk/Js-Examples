//setTimeout(() => {},100000);

const githubForm = document.getElementById("form_control");//html kısmındaki formun id sini seçtik
const nameInput = document.getElementById("textSearch");//html kısmındaki arama text inin id sini seçtik
const github = new Github(); //import github.js
const arayuz = new Arayuz(); //import arayuz.js
EventListener();
function EventListener(){
    githubForm.addEventListener("submit",getData);
    

}
// function getLang{
// let 
// }

function getData(e){

    let reponame =toString(Text)
    let username = nameInput.value.trim();
    if(username===""){
        alert("Kullanıcı adı yanlış girdiniz")// boş kullanıcı adı girilirse hata al
    }
    else{
        github.getGithubData(username, reponame)
        .then(response => {
            if(response.user.message==="bulunamadı"){ //yanlış kullanıcı adı girilirse hata al
               arayuz.showError("Böyle bir kullanıcı yok")

            }
            else{
               arayuz.showUserInfo(response.user); //eğer hata yok ise arayuz.js de yazılan functionu index.html e yazdır
               arayuz.showRepoInfo(response.repo);
            

            }

        })
        .catch(err => console.log(err));

    }
    arayuz.clearInput();
    e.preventDefault();
}