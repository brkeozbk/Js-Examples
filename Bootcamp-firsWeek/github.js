class Github{ //github api json dosyamızın veri çekmemizi sağlayan class
    constructor(){
        this.url = "https://api.github.com/users/";
    }
    async getGithubData(username){
        const responseUser = await fetch(this.url+username);
        const responseRepo = await fetch(this.url+username + "/repos"); //user repos sayfasına yönelen kısım

        const userData = await responseUser.json(); //user bilgilerine eriştiğimiz kod
        const repoData = await responseRepo.json(); //repo bilgilerimize eriştiğimiz kısım

        return{
            user:userData, 
            repo:repoData
        }

    }
}