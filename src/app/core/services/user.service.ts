import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(
    private http: HttpClient,
  ) {}


  getAllUsers(page:number) {
    return this.http.get<any>(environment.basicUrl +`users?page=${page}`)
  }

  getUserById(id:string) {
    return this.http.get<any>(environment.basicUrl +`users/${id}`)
  }

}
