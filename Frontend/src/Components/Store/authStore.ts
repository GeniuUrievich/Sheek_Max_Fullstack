import { makeAutoObservable } from "mobx"

class AuthStore {
  isAuth = false
  accessToken: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.loadToken()
  }

  login(token: string) {
    this.accessToken = token
    localStorage.setItem("acces_token", token)
    this.isAuth = true
  }

  logout() {
    this.accessToken = null
    localStorage.removeItem("acces_token")
    this.isAuth = false
  }

  loadToken() {
    const token = localStorage.getItem("acces_token")
    if (token) {
      this.accessToken = token
      this.isAuth = true
    }
  }
}

export const authStore = new AuthStore()