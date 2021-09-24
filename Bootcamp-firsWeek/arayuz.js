class Arayuz{
   
    constructor(){
        this.profil=document.getElementById("profil");
        this.langDiv=document.getElementById("altbolum");
        this.inputField = document.getElementById("textSearch");
        
    }
    clearInput(){
        this.inputField.value = "";
    }
    showUserInfo(user){
        this.profil.innerHTML = `
        <div class="ilkbolum">
            <div class="sol">
                <div class="foto">
                    <img class="img" src="${user.avatar_url}" />
                </div>
                <div class="ism">
                    <p class="ad" >${user.name}</p>
                    <p class="k_ad">@${user.login}</p>
                </div>

            </div>
            <div class="sag">
                <p class="rep">${user.public_repos} Repos</p>
                <p class="cod">${user.repos_size} </p>

            </div>
        </div>
        <hr />
       
  
        `;

    }

    showError(message) {
        const div = document.createElement("div");

        div.className = "alert alert-danger";
        div.textContent = message;

        this.cardBody.appendChild(div);

        setTimeout(()=>{
            div.remove();
        },2000);

    }


    showRepoInfo(repos){

        this.langDiv.innerHTML= "";
        
        repos.forEach(repo => {
            this.langDiv.innerHTML += `

            <div id="languages" class="lang">
            <span class="badge" id="repoStar">${repo.language}</span>
            <span class="badgee" id="repoSize">${repo.size} KB</span>

            </div>
            
            `;
            
        });
    }

}

