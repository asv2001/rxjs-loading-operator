The `rxjs-loading-operator` enables setting of the loading state. You can use it like follows:

```typescript
import { of } from "rxjs";
import { loadingState } from "rxjs-loading-operator";
import { timeout } from "rxjs/operators";

const subject$ = of(true).pipe(timeout(5000));
subject$.pipe(loadingState((loading: boolean): void => {
  console.log(`loading: ${loading}`);
})).subscribe();
```
