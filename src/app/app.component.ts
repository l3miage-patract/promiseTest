import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public showLoading = false;
  public  userInfos! : any
  public userLogin! : string
  public avatarUrl! : string

  async getGithubInfos(getLogin : HTMLInputElement) {

    this.showLoading = true
    
    try {
      const resPromise = await fetch(`https://api.github.com/users/${getLogin.value}`)
      getLogin.value = ''
      this.showLoading = false

      const resEnJSON = await resPromise.json()
      this.userInfos = resEnJSON
      this.userLogin = resEnJSON.login
      this.avatarUrl = resEnJSON.avatar_url
      localStorage.clear()
      localStorage.setItem("userInfos", JSON.stringify(resEnJSON))
    } catch(rejectExecption) {
      throw new Error("Fatal error fetch(), reason :" + rejectExecption)
    } 
  }

  ngOnInit () : void {
    const getUserInfosFromLocalStorage = localStorage.getItem('userInfos')
    
    if (getUserInfosFromLocalStorage) {
      this.userInfos = JSON.parse(getUserInfosFromLocalStorage)
    }
  }
}