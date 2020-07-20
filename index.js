"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingState = void 0;
var rxjs_1 = require("rxjs");
function loadingState(action) {
    return function (source) {
        return new rxjs_1.Observable(function (observer) {
            action(true);
            return source.subscribe({
                next: function (x) {
                    observer.next(x);
                },
                error: function (err) {
                    observer.error(err);
                    action(false);
                },
                complete: function () {
                    observer.complete();
                    action(false);
                }
            });
        });
    };
}
exports.loadingState = loadingState;
