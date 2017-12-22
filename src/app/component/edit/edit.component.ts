import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address, Person, SearchService} from "../../shared";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  person: Person;
  editName: string;
  editPhone: string;
  editAddress: Address;

  constructor(private searchService: SearchService, private  route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = + params['id'];
      this.searchService.get(id).subscribe(person => {

        if (person) {
          this.person = person;
          this.editName = person.name;
          this.editPhone = person.phone;
          this.editAddress = person.address;

        } else {

          this.gotoList();

        }
      });
    });

  }

  gotoList() {
    if (this.person) {
      this.router.navigate(['/search', {term: this.person.name}]);
    } else {
      this.cancel();
    }
  }

  save(): void {
    this.person.name = this.editName;
    this.person.phone = this.editPhone;
    this.person.address = this.editAddress;
    this.searchService.save(this.person);
    this.gotoList();
  }

  cancel(): void {
    this.router.navigate(['/search']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
