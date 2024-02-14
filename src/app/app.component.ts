import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { ResizableDirective } from './resizable.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResizableDraggableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-resizable-draggable';
}
