import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import { listAnimation } from 'src/app.animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { isThisTypeNode } from 'typescript';

@Component({
  animations: [listAnimation],
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];
  orderProp = "newest";
  phonesCache: Phone[] = [];
  showList = false;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe(phones => {
      this.phones = phones;
      this.phonesCache = phones;
      this.sortByDate();
    });
    this.showList = true;
  }

  onClick(): void {
    if (this.orderProp == "alphabetical") this.sortByName();
    else this.sortByDate();
  }

  sortByName(): void {
    this.showList = false;
    this.phones = [...this.phones.sort((a, b) => (a.name > b.name) ? 1 : -1)];
    this.showList = true;
  }

  sortByDate(): void {
    this.showList = false;
    this.phones = [...this.phones.sort((a, b) => (a.age > b.age) ? 1 : -1)];
    this.showList = true;
  }

  onChange(): void {
    if (this.orderProp == "alphabetical") this.sortByName();
    else this.sortByDate();
  }

  onQuery(event: any): void {
    const query = event.target.value;
    this.phones = this.phonesCache.filter(el => el.name.toLowerCase().includes(query.toLowerCase()));
  }
}
