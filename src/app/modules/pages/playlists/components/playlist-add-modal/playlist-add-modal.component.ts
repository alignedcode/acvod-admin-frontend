import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { AddPlaylistDto } from '@core/modules/rest-api/models/playlist/add-playlist.dto';
import { PlaylistPrivacy } from '@core/modules/rest-api/models/playlist/playlist.dto';
import { PlaylistAddModalService } from './playlist-add-modal.service';

@Component({
  selector: 'playlist-add-modal',
  templateUrl: './playlist-add-modal.component.html',
  styleUrls: ['./playlist-add-modal.component.scss'],
})
export class PlaylistAddModalComponent implements OnInit {
  @Input() initialModel: Partial<AddPlaylistDto> = {};

  playlistForm: FormGroup;

  readonly privacyOptions = this.service.privacyOptions;

  constructor(
    private readonly dialogReference: NbDialogRef<PlaylistAddModalComponent>,
    private readonly service: PlaylistAddModalService,
  ) {}

  ngOnInit() {
    this.playlistForm = new FormGroup({
      title: new FormControl(this.initialModel.title, [Validators.required]),
      description: new FormControl(this.initialModel.description, []),
      privacy: new FormControl(this.initialModel.privacy, [
        Validators.required,
      ]),
    });
  }

  onAddPlaylist() {
    this.service.addPlaylist(this.playlistForm.value).subscribe(
      () => this.dialogReference.close(),
      () => this.dialogReference.close(),
    );
  }

  onClose() {
    this.dialogReference.close();
  }
}
