import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get('assets/data/people.json');
  }

  get(id: number) {

    return this.getAll().map((data: any) => {
      if (localStorage['person' + id]) {
        return JSON.parse(localStorage['person' + id]);
      }
      return data.find(item => item.id === id);
    });

  }

  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }

  search(q: string): Observable<any> {

    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }

    return this.getAll().map(data => {
      return data.filter(item => JSON.stringify(item).toLowerCase().includes(q));
    });
  }

}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {

    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.state = obj && obj.state || null;
    this.zip = obj && obj.zip || null;

  }

}


export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {

    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.phone = obj && obj.phone || null;
    this.address = obj && obj.address || null;

  }

}
