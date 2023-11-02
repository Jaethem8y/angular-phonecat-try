import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhoneService } from '../phone.service';
import { ActivatedRoute } from '@angular/router';
import { PhoneDetail } from '../phone';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit {

  // Guess we can change this to loading state and stuff
  phoneDetail!: PhoneDetail;
  image!: string;
  isLoading = true;

  constructor(private route: ActivatedRoute, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.isLoading = true;
    const phoneId = this.route.snapshot.params['phoneId'];
    this.phoneService.getPhoneDetail(phoneId).subscribe(phoneDetail => {
      this.phoneDetail = phoneDetail;
      this.image = this.phoneDetail.images[0];
      this.isLoading = false;
    });
  }

  setImage(img: string) {
    this.image = img;
  }

}
