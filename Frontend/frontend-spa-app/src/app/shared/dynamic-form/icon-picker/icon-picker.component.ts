import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconsMap } from '../../icons-map'; // import your generated map

@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.css',
})
export class IconPickerComponent implements OnInit {
  @Input() selectedIcon: string | null = null;
  @Output() iconChange = new EventEmitter<string>();

  currentPath: string[] = [];
  currentItems: { name: string; type: 'folder' | 'icon'; path: string }[] = [];

  ngOnInit() {
    this.updateCurrentItems();
  }

  updateCurrentItems() {
    let node: any = IconsMap;
    for (const part of this.currentPath) {
      node = node?.[part];
    }

    this.currentItems = [];

    if (this.currentPath.length > 0) {
      this.currentItems.push({
        name: '...',
        type: 'folder',
        path: '',
      });
    }

    for (const key of Object.keys(node)) {
      const value = node[key];
      if (typeof value === 'string') {
        this.currentItems.push({ name: key, type: 'icon', path: value });
      } else {
        this.currentItems.push({ name: key, type: 'folder', path: '' });
      }
    }
  }

  selectItem(item: { name: string; type: 'folder' | 'icon'; path: string }) {
    if (item.name === '...') {
      this.currentPath.pop();
      this.updateCurrentItems();
      return;
    }

    if (item.type === 'folder') {
      this.currentPath.push(item.name);
      this.updateCurrentItems();
    } else {
      this.selectedIcon = item.path;
      this.iconChange.emit(item.path);
    }
  }

  isSelected(item: any): boolean {
    return item.type === 'icon' && item.path === this.selectedIcon;
  }
}
