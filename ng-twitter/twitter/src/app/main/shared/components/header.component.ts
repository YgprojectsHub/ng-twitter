import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <div class="border-b-[1px] border-neutral-800 p-5">
      <div class="flex flex-row items-center gap-2">
        <span *ngIf="showBackArrow" class="material-icons text-white cursor-pointer" (click)="goBack()">
          arrow_back
        </span>
        <h1 class="text-white text-xl font-semibold">{{title}}</h1>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent {
  @Input() showBackArrow: boolean = false;
  @Input() title: string = ""
  constructor(private router: Router){}

  goBack(): void {
    this.router.navigate(['/'])
  }
}
