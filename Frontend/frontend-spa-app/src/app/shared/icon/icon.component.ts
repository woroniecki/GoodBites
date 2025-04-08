import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-icon',
  template: `<svg [ngClass]="class" [ngStyle]="style" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path [attr.d]="iconPath"></path>
            </svg>`,
  imports: [CommonModule],
  standalone: true,
})
export class IconComponent {
  @Input() iconPath: string = ''; // Path for the SVG path data
  @Input() class: string = '';    // Add any class if needed
  @Input() style: any = {};      // Add custom styles
}