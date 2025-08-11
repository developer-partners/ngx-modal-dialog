import { Component, ComponentRef, ViewChild, ViewContainerRef, AfterViewInit, Type, ChangeDetectorRef, ElementRef, OnDestroy, ViewEncapsulation, EnvironmentInjector, Injector, Input } from "@angular/core";
import { ModalReference } from './modal-reference';
import { ModalSize } from './modal-config';

@Component({
  selector: 'dp-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    './modal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private _changeDetectorRef: ChangeDetectorRef;

  private _mouseDownPressed: boolean;

  public modalReference: ModalReference<any>;
  public componentRef: ComponentRef<any>;
  public contentComponentType: Type<any>;
  public modalSize = ModalSize;
  public classConfig: any;

  public envInjector?: EnvironmentInjector;
  public elementInjector?: Injector;

  @ViewChild('contentContainer', { read: ViewContainerRef })
  public contentContainer: ViewContainerRef;

  @ViewChild('bodyElement')
  public bodyElement: ElementRef<HTMLElement>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    modalRefernce: ModalReference<any, any>
  ) {
    this._changeDetectorRef = changeDetectorRef;
    this.modalReference = modalRefernce;
  }

  private createModalContent(componentType: Type<any>): ComponentRef<any> {
    this.contentContainer.clear();

    return this.contentContainer.createComponent(componentType, {
      injector: this.elementInjector ?? this.contentContainer.injector,
      environmentInjector: this.envInjector ?? this.contentContainer.injector.get(EnvironmentInjector)
    });
  }

  public ngAfterViewInit(): void {
    this.componentRef = this.createModalContent(this.contentComponentType);

    // To update the view.
    this._changeDetectorRef.detectChanges();

    // To take focus from a button clicked behind the modal;
    this.bodyElement.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private isBackdropElement(target: EventTarget): boolean {
    let targetElement = <HTMLElement>target;

    if (targetElement.classList.contains('dp-backdrop')) {
      return true;
    }
    if (targetElement.classList.contains('dp-close-modal')) {
      return true;
    }

    return false;
  }

  public mouseDownEvent(event: MouseEvent, backdropCliecked: boolean): void {
    // The backdropCliecked will be false if the event is just bubbled up from a child element.
    if (backdropCliecked && !this.isBackdropElement(event.target)) {
      return
    }

    // Mark the mouse button pressed to check on the mouseUp event.
    this._mouseDownPressed = !this._mouseDownPressed;
  }

  public mouseUpEvent(event: MouseEvent): void {
    // Check if the mouse was clicked on the backdrop.
    if (this._mouseDownPressed) {
      // Check if the mouse button was released on the backdrop
      if (this.isBackdropElement(event.target)) {
        // If mouse button was released on the backdrop, close the modal.
        event.stopPropagation();
        this.modalReference.cancel();
      }
    }
  }

  public keyUpEvent(event: KeyboardEvent): void {
    // Close on the Esc key press.
    if (event.which === 27) {
      this.modalReference.cancel();
    }
  }

  public maximize(): void {
    this.modalReference.config.mode = 'fullScreen';
  }

  public restoreWindow(): void {
    this.modalReference.config.mode = 'default';
  }

  public close() {
    this.modalReference.cancel();
  }
}
