export interface ModalConfig<T> {
  title: string;
  size?: ModalSize;
  model?: T;
  type?: 'default' | 'error' | 'warning' | 'success',
  mode?: 'default' | 'disableFullScreen' | 'fullScreen';
  position?: 'center' | 'bottom'
}

export enum ModalSize {
  default,
  large,
  extraLarge,
  medium
}
