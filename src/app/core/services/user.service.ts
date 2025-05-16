import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(
    private http: HttpClient,
  ) {}


  getAllUsers(page:number) {
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`)
  }

  getUserById(id:string) {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`)
  }

}
