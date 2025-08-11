import { ViewContainerRef } from "@angular/core";

export interface ModalConfig<T> {
  title: string;
  size?: ModalSize;
  model?: T;
  type?: 'default' | 'error' | 'warning' | 'success',
  mode?: 'default' | 'disableFullScreen' | 'fullScreen';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  viewContainerRef?: ViewContainerRef;
}

export enum ModalSize {
  default,
  large,
  extraLarge,
  medium
}
