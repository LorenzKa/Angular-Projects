import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  logs: string[] = [];
  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.notifier.listen().subscribe((m: string) => {
      this.logs.push(m);
    });
  }

}
