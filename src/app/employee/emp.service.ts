import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
 url: string = 'https://b51737f7.ngrok.io/api/Settings/GetDesignations';
 deleteUrl: string = 'https://b51737f7.ngrok.io/api/Settings/DeleteDesignation?DesignationId='
 insupUrl: string = 'https://b51737f7.ngrok.io/api/Settings/InsUpdateDesignation'


  constructor(private _http:HttpClient) {}

  getAllEmployees()
  {
      return this._http.get(this.url);
  }

  deleteEmployee(id)
  {
    let head = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.deleteUrl+id,{headers:head});
  }

  addemployee(item)
  {
    let body=JSON.stringify(item);
    let head = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.insupUrl,body,{headers:head});
  }
  editemployee(item)
  {
    let body=JSON.stringify(item);
    let head = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.insupUrl,body,{headers:head});
  }

}
