class Github {
    constructor() {
      this.url = "https://api.github.com/users/";
      this.repoUrl = "https://api.github.com/repos/";
    }
    async getGithubData(username) {
      const responseUser = await fetch(this.url + username);
      const responseRepo = await fetch(this.url + username + "/repos");
  
      const userData = await responseUser.json();
      const repoData = await responseRepo.json();
      JSON.stringify(repoData)
      
      // set language percentage of each repo
      for (let i in repoData) {
        // get language percentage of repo
        repoData[i] = await this.getRepoLanguages(
          username,
          repoData[i].name
        );
      }
      // console.log(repoData);

      const LangInfo = {
        LName: String,
        LSize: String,
      }
      const RepoLanguages = [];

      repoData.forEach((repo) => {
        for(MediaKeys in repo) {
          //Obje olusturuldu
          var Lobj = Object.create(LangInfo);
          Lobj.LName = MediaKeys;
          Lobj.LSize = repo[MediaKeys];
          //Obje array icerisine aktrildi
          RepoLanguages.push(Lobj);
        }
      })
      // console.log(RepoLanguages);

      //Her degeri kendinden sonrakiyle kiyasla O(n^2)
      const UsedLanguages = [];
      for(let i=0; i<RepoLanguages.length;i++) {
        UsedLanguages[i] = (RepoLanguages[i]);
        for(let j=i+1; j<RepoLanguages.length; j++) {
          if(UsedLanguages[i].LName === RepoLanguages[j].LName) {
            UsedLanguages[i].LSize = UsedLanguages[i].LSize + RepoLanguages[j].LSize;
            RepoLanguages[j].LName = '';
            RepoLanguages[j].LSize = '';
          }
        }
      } 
      // console.log(UsedLanguages);

      //Gecerlileri RepoL array icine aktar (Gecerli olmayanlar: '' (Kiyaslamadan kalma hata))
      const RepoL = [];
      var TotalSize = 0;
      UsedLanguages.forEach((lang) => { 
        if(lang.LName !== '') { 
          RepoL.push(lang);
          TotalSize += lang.LSize; 
        } 
      })
      // console.log(RepoL);

      //Sayısalcıların Yüzdelik hesaplaması 12 Yıllık sayısal eğitiminden sonra
      RepoL.forEach((data) => {
        data.LSize = ((data.LSize*100)/TotalSize).toFixed(2);
      })
      // console.log(RepoL);
      
      return {
        user: userData,
        repo: RepoL,
      };
      
    }
    
    
    async getRepoLanguages(username, reponame) {
      const ls = await fetch(
        this.repoUrl + username + "/" + reponame + "/languages"
      )
      const langs = await ls.json();
      return langs;
    }

    // async getRepoLanguagePercentage(username, reponame) {
     
    //   const ls = await fetch(
    //     this.repoUrl + username + "/" + reponame + "/languages"
    //   );
     
    //   const languageStats = await ls.json();
    //   const totalPtsArr = Object.values(languageStats);

    //   var sumTotalPts = 0;
    //   totalPtsArr.forEach((pts) => {
    //     sumTotalPts += pts;
    //   });
  
    //   const languagesPercentage = {};
    //   JSON.stringify(languagesPercentage);
    //   Object.keys(languageStats).forEach((lang) => {
    //     languagesPercentage[lang] = (languageStats[lang] * 100) / sumTotalPts;
    //   });
      
  
    //   return languagesPercentage;
    // }
    
  }