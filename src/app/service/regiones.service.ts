import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  constructor(private http: HttpClient) {}

  getRegiones() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(
      'https://private-anon-d632cb0c3a-testphonebook.apiary-mock.com/region',
      {
        headers: headers,
      }
    );
  }
}
