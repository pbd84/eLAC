import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ElacApiServices} from '../services/elac-api-services';
import {ElacDataService} from '../services/elac-data.service';
import {flatMap, pluck} from 'rxjs/operators';
import {forkJoin, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-elac-audio-player',
  templateUrl: './elac-audio-player.component.html',
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElacAudioPlayerComponent implements OnInit {

  audio;
  audioType;
  audioId;

  public data = [];

  constructor(private activeRoute: ActivatedRoute, private apiSvc: ElacApiServices, private dataService: ElacDataService) {
      // ### fetch data from Data Service ###
      this.dataService.passData$.subscribe(data =>
      this.data = data);
      console.log('audiodata', this.data);
    }

  ngOnInit(): void {
    // ### initialize audio ###
    this.audioId = `${this.activeRoute.snapshot.params.prefix}/${this.activeRoute.snapshot.params.id}`;
    this.audio = this.apiSvc.requestMediafile(this.audioId);
    this.audioType = `${this.activeRoute.snapshot.params.contentType}/${this.activeRoute.snapshot.params.suffix}`;
    //this.audioType = `${this.activeRoute.snapshot.params.contentType}/wav`;
    console.log("testo", this.audioType)
  }

}
