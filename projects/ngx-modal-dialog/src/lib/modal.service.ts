import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, ComponentRef, InjectionToken, AbstractType, InjectFlags, EmbeddedViewRef, ViewContainerRef } from "@angular/core";
import { ModalConfig } from "./modal-config";
import { ModalReference } from "./modal-reference";
import { ModalComponent } from "./modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private readonly _applicaionRef: ApplicationRef,
    private readonly _viewContainer: ViewContainerRef,
    private readonly _injector: Injector
  ) {
  }

  private createModalComponent(dependecies: WeakMap<any, any>): ComponentRef<ModalComponent> {
    return this._viewContainer.createComponent(ModalComponent, {
      injector: new ModalInjector(
        this._injector,
        dependecies
      )
    });
  }

  private createModalRefernce<TConfig, TResult>(map: WeakMap<any, any>, config: ModalConfig<TConfig>): InternalModalRef<TConfig, TResult> {
    let modalReference = new InternalModalRef<TConfig, TResult>(config);

    // Create with internal implementation, but inject the public version.
    map.set(ModalReference, modalReference);

    modalReference.componentRef = this.createModalComponent(map);

    modalReference
      .result()
      .subscribe({
        complete: () => this.removeModal(modalReference)
      });

    return modalReference;
  }

  public show<TConfig, TResult>(componentType: Type<any>, config: ModalConfig<TConfig>): ModalReference<TConfig, TResult> {
    let map = new WeakMap<any, any>();
    let modalReference = this.createModalRefernce<TConfig, TResult>(map, config);

    modalReference.componentRef.instance.contentComponentType = componentType;

    this._applicaionRef.attachView(modalReference.componentRef.hostView);
    document.body.appendChild(modalReference.getHtmlElement());

    // To trigger the animation effect. The modal is added to document at this point, but it's invisible.
    // We animate the showing part.
    window.setTimeout(() => {
      modalReference.getHtmlElement().firstElementChild.classList.add('app-visible');
    });

    modalReference.componentRef.changeDetectorRef.detectChanges();

    return modalReference;
  }

  private removeModal<TConfig, TResult>(modalReference: InternalModalRef<TConfig, TResult>): void {
    modalReference.getHtmlElement().firstElementChild.classList.remove('app-visible');

    // Wait until the closing animation is done, then remove the component.
    window.setTimeout(() => {
      this._applicaionRef.detachView(modalReference.componentRef.hostView);
      modalReference.componentRef.destroy();
    }, 400);
  }
}

class ModalInjector implements Injector {
  constructor(
    private readonly _injector: Injector,
    private readonly _extraDependencies: WeakMap<any, any>
  ) {
  }

  public get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
  public get(token: any, notFoundValue?: any);
  public get(token: any, notFoundValue?: any, flags?: any) {
    let resolved = this._extraDependencies.get(token);

    if (resolved) {
      return resolved;
    }

    return this._injector.get(token, notFoundValue, flags);
  }
}

class InternalModalRef<TConfig, TResult> extends ModalReference<TConfig, TResult> {
  public componentRef: ComponentRef<ModalComponent>;

  constructor(config: ModalConfig<TConfig>) {
    super(config);
  }

  public getHtmlElement(): HTMLElement {
    let viewRef = this.componentRef.hostView as EmbeddedViewRef<ModalComponent>;
    return viewRef.rootNodes[0];
  }
}
