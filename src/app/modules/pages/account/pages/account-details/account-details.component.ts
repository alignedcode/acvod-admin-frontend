import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Blogger } from '@data/models/blogger.entity';
import { BloggersService } from '@data/services/bloggers.service';
import { BloggerQuery } from '@data/state/blogger/blogger.query';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  blogger?: Blogger;

  private readonly subscriptions: { onBloggerChange: Subscription } & {
    [key: string]: Subscription;
  };

  constructor(
    private readonly service: BloggersService,
    private readonly query: BloggerQuery,
  ) {
    this.subscriptions = {
      onBloggerChange: this.query.blogger$.subscribe(
        (blogger) => (this.blogger = blogger),
      ),
    };
  }

  ngOnInit() {
    this.service
      .getBloggerId()
      .subscribe((id) => this.service.loadBlogger(id).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.onBloggerChange.unsubscribe();
  }
}
