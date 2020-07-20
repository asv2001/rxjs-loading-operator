import { of, throwError } from "rxjs";
import { switchMapTo, timeout } from "rxjs/operators";
import { loadingState } from "./index";

jest.useFakeTimers();

describe("loading operator", () => {
  it("sets loading state", () => {
    const subject$ = of(true).pipe(timeout(5000));
    const loadingCallback = jest.fn();
    subject$.pipe(loadingState(loadingCallback)).subscribe();
    expect(loadingCallback).toHaveBeenCalledWith(true);
    jest.advanceTimersByTime(4999);
    expect(loadingCallback).toHaveBeenCalledWith(true);
    jest.advanceTimersByTime(1);
    expect(loadingCallback).toHaveBeenCalledWith(false);
  });

  it("sets loading state on error", () => {
    const subject$ = of(true).pipe(timeout(5000), switchMapTo(throwError("some error")));
    const loadingCallback = jest.fn();
    subject$.pipe(loadingState(loadingCallback)).subscribe(() => {}, (errorMessage) => {
      console.log(`finished with an error: ${errorMessage}`);
    });
    expect(loadingCallback).toHaveBeenCalledWith(true);
    jest.advanceTimersByTime(4999);
    expect(loadingCallback).toHaveBeenCalledWith(true);
    jest.advanceTimersByTime(1);
    expect(loadingCallback).toHaveBeenCalledWith(false);
  });
});
