import { Component } from '@angular/core';
import { ResizableDirective } from '../resizable.directive';

@Component({
  selector: 'app-resizable-draggable',
  standalone: true,
  imports: [ResizableDirective],
  templateUrl: './resizable-draggable.component.html',
  styles: ``,
})
export class ResizableDraggableComponent {}
