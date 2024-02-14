import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appResizable]',
  standalone: true,
})
export class ResizableDirective implements AfterViewInit {
  @Input() minWidth = 0;
  @Input() maxWidth = Number.MAX_VALUE;
  @Output() resized = new EventEmitter<{ width: number; direction: string }>();

  private startWidth: any;

  private leftHandle: HTMLDivElement | null = null;
  private rightHandle: HTMLDivElement | null = null;
  isResizing: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown')
  onMouseDown(): void {
    this.isResizing = true;
    this.renderer.addClass(this.el.nativeElement, 'resizing');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const deltaX = Math.round(
        event.clientX - this.el.nativeElement.getBoundingClientRect().left
      );

      let newWidth = this.startWidth! + deltaX;

      newWidth = Math.min(this.maxWidth, Math.max(this.minWidth, newWidth));

      this.resized.emit({
        width: newWidth,
        direction: deltaX < 0 ? 'left' : 'right',
      });

      this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.renderer.removeClass(this.el.nativeElement, 'resizing');
    this.isResizing = false;
    this.startWidth = null;
  }

  private initializeHandles(): void {
    const handleWidth = '10px';
    const handleHeight = '100%';
    const handlePosition = 'absolute';

    this.leftHandle = this.renderer.createElement('div');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
    // Styling for left handle
    this.renderer.setStyle(this.leftHandle, 'height', handleHeight);
    this.renderer.setStyle(this.leftHandle, 'width', handleWidth);
    this.renderer.setStyle(this.leftHandle, 'position', handlePosition);
    this.renderer.setStyle(this.leftHandle, 'left', '0');
    this.renderer.setStyle(this.leftHandle, 'top', '0');
    this.renderer.setStyle(this.leftHandle, 'cursor', 'col-resize');
    this.renderer.appendChild(this.el.nativeElement, this.leftHandle);

    // Styling for right handle
    this.rightHandle = this.renderer.createElement('div');
    this.renderer.setStyle(this.rightHandle, 'height', handleHeight);
    this.renderer.setStyle(this.rightHandle, 'width', handleWidth);
    this.renderer.setStyle(this.rightHandle, 'position', handlePosition);
    this.renderer.setStyle(this.rightHandle, 'right', '0');
    this.renderer.setStyle(this.rightHandle, 'top', '0');
    this.renderer.setStyle(this.rightHandle, 'cursor', 'col-resize');
    this.renderer.appendChild(this.el.nativeElement, this.rightHandle);
  }

  ngAfterViewInit(): void {
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.initializeHandles();
  }
}
