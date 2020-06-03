import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'youtube-not-bound-account-dialog',
  templateUrl: 'youtube-not-bound-account-dialog.component.html',
  styleUrls: ['youtube-not-bound-account-dialog.component.scss'],
})
export class YouTubeNotBoundAccountDialogComponent {
  @Input() title: string;

  constructor(
    private readonly dialogReference: NbDialogRef<
      YouTubeNotBoundAccountDialogComponent
    >,
  ) {}

  dismiss() {
    this.dialogReference.close();
  }
}
