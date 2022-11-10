import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ModalConfig } from './modal-config';

export class ModalReference<TConfig, TResult = TConfig> {
  private _event: Subject<TResult>;
  private _cancelEvent: Subject<void>;

  public config: ModalConfig<TConfig>;

  constructor(config: ModalConfig<TConfig>) {
    this.config = config;
    this._event = new Subject<TResult>();
    this._cancelEvent = new Subject();
  }

  public result(): Observable<TResult> {
    return this._event.asObservable()
  }

  public cancelResult(): Observable<void> {
    return this._cancelEvent.asObservable();
  }

  public closeSuccess(model?: TResult): void {
    this._event.next(model);
    this._event.complete();
  }

  public cancel(): void {
    // Just comlete the event transmission.
    this._event.complete();

    this._cancelEvent.next();
    this._cancelEvent.complete();
  }
}