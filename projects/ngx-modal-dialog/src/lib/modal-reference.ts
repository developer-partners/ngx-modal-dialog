import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ModalConfig } from './modal-config';

export class ModalReference<TConfig, TResult = TConfig> {
  private _event: Subject<TResult>;

  public config: ModalConfig<TConfig>;

  constructor(config: ModalConfig<TConfig>) {
    this.config = config;
    this._event = new Subject<TResult>();
  }

  public result(): Observable<TResult> {
    return this._event.asObservable()
  }

  public closeSuccess(model?: TResult): void {
    this._event.next(model);
    this._event.complete();
  }

  public cancel(): void {
    // Just comlete the event transmission.
    this._event.complete();
  }
}