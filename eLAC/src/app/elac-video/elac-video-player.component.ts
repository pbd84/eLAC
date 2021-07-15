import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ElacApiServices} from '../services/elac-api-services';
import {forkJoin, Observable} from "rxjs";
import {flatMap, pluck} from "rxjs/operators";
import {ElacDataService} from "../services/elac-data.service";

@Component({
  selector: 'app-elac-video-player',
  templateUrl: './elac-video-player.component.html',
  styles: [`

  video {
    width: 60vw;
    height: 30vh;
  }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElacVideoPlayerComponent implements OnInit {

  @Input() label;
  @Input() src;
  @Input() type;
  @Input() thumbnail;
  @Input() bundleDescription;
  video;
  videoType;
  videoId;

  public data = [];


  constructor(private activeRoute: ActivatedRoute, private apiSvc: ElacApiServices, private dataService: ElacDataService) {
    // ### fetch data from Data Service ###
    this.dataService.passData$.subscribe(data =>
    this.data = data);
    console.log(this.data);
  }

  ngOnInit(): void {
    // ### initialize video ###
    this.videoId = `${this.activeRoute.snapshot.params.prefix}/${this.activeRoute.snapshot.params.id}`;
    this.video = this.apiSvc.requestMediafile(this.videoId);
    this.videoType = `${this.activeRoute.snapshot.params.contentType}/${this.activeRoute.snapshot.params.suffix}`;
  }

}
