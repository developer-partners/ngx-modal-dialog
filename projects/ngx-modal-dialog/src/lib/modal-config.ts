export interface ModalConfig<T> {
  title: string;
  size?: ModalSize;
  model?: T;
  type?: 'default' | 'error' | 'warning' | 'success',
  mode?: 'default' | 'disableFullScreen' | 'fullScreen';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export enum ModalSize {
  default,
  large,
  extraLarge,
  medium
}
