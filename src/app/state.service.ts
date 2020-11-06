import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { scan, shareReplay, map, pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StateService {
  private _state = new BehaviorSubject<any>({});
  //public page$ = this._state.asObservable();
  public state$ = this._state.asObservable().pipe(
    scan((prevState, nextState) => ({ ...prevState, ...nextState })),
    shareReplay(1)
  );

  public select(key: string) {
    return this.state$.pipe(pluck(key));
  }

  public dispatch({ key, payload }: { key: string; payload: any }) {
    this._state.next({ [key]: payload });
  }
}
