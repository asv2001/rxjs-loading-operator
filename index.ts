import { MonoTypeOperatorFunction, Observable, Subscriber, Subscription } from "rxjs";

export type LoadingCallback = (state: boolean) => void;

export function loadingState<T>(action: LoadingCallback): MonoTypeOperatorFunction<T> {
  return <T>(source: Observable<T>) => {
    return new Observable<T>((observer: Subscriber<T>): Subscription => {
      action(true);
      return source.subscribe({
        next(x) {
          observer.next(x);
        },
        error(err) {
          observer.error(err);
          action(false);
        },
        complete() {
          observer.complete();
          action(false);
        }
      });
    });
  };
}
