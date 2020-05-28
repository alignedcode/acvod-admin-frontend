import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BloggerDetails } from '@core/modules/rest-api/models/blogger-detais.model';
import { BloggersService } from '@data/services/bloggers.service';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  bloggerDetails: BloggerDetails | null;

  private readonly subscriptions: { onDetailsChange: Subscription } & {
    [key: string]: Subscription;
  };

  constructor(private readonly bloggersService: BloggersService) {
    this.subscriptions = {
      onDetailsChange: this.bloggersService.onDetailsChange.subscribe(
        (details) => (this.bloggerDetails = details),
      ),
    };
  }

  ngOnInit(): void {
    this.bloggersService.getBlogger().subscribe(({ id }) => {
      this.bloggersService
        .getDetails(id)
        .subscribe((details) => (this.bloggerDetails = details));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.onDetailsChange.unsubscribe();
  }
}
