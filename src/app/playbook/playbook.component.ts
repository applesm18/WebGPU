import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebGPU } from './webgpu';

@Component({
  selector: 'app-playbook',
  templateUrl: './playbook.component.html',
  styleUrls: ['./playbook.component.css'],
})
export class PlaybookComponent {
  constructor(
    private router: Router
  ) { }

  player: WebGPU = new WebGPU();
  gotoHome(){
    setTimeout(() => {
        console.log("gotoplaybook =>");
        this.router.navigate(['/playbook']);
    }, 100);
  }
  gotoPrevious(){

  }

  gotoNext(){

  }

  ngOnInit() {
   this.player.configWebGPU();
  }
}
