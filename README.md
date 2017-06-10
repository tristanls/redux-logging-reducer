# redux-logging-reducer

Adds logging of dispatched actions to your reducer functionality storing dispatched actions in the reducer's store.

NOTE: Since writing this module, I found it easier to test reducer and `redux-observable` epics separately using patterns described here: [Writing Epic Unit Tests](https://medium.com/kevin-salters-blog/writing-epic-unit-tests-bd85f05685b).

## Usage

```javascript
import { applyMiddleware, createStore } from "redux";
import { logging, log, noLog } from "redux-logging-reducer";

import reducer from "./reducer";

const middleware = [];

describe("Testing actions", () =>
{
    let store;
    beforeEach(() =>
        {
            store = createStore(logging(reducer), applyMiddleware(...middleware));
        }
    );
    it("should log dispatched action and return initial state", () =>
        {
            store.dispatch({type: "MY_ACTION"});
            const dispatched = log(store.getState());
            const state = noLog(store.getState());
            expect(dispatched).toContainEqual({type: "MY_ACTION"});
            expect(state).toEqual(reducer.INITIAL_STATE);
        }
    );
});
```

## Documentation

#### log(state, fieldName = "@@redux-logging-reducer/log")

  * `state`: _Object_ Redux state from `store.getState()`.
  * `fieldName`: _String_ Field name to extract log of dispatched actions from.
  * Return: _Array_ Array of dispatched actions.

Extracts the log of dispatched actions from Redux store state.

#### logging(reducer, fieldName = "@@redux-logging-reducer/log")

  * `reducer`: _Function_ Redux reducer to add logging to.
  * `fieldName`: _String_ Field name to store log of dispatched actions in.
  * Return: _Function_ Redux reducer that will log dispatched actions in `fieldName`.

Monkey patches `reducer` to store log of dispatched actions.

#### noLog(state, fieldName = "@@redux-logging-reducer/log")

  * `state`: _Object_ Redux state from `store.getState()`.
  * `fieldName`: _String_ Field name to remove containing dispatched actions.
  * Return: _Object_ Redux store state without dispatched actions log.

Removed log of dispatched actions from Redux store state.

## Releases

[Current releases](https://github.com/tristanls/redux-logging-reducer/releases).

### Policy

We follow the semantic versioning policy ([semver.org](http://semver.org/)) with a caveat:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
>MAJOR version when you make incompatible API changes,<br/>
>MINOR version when you add functionality in a backwards-compatible manner, and<br/>
>PATCH version when you make backwards-compatible bug fixes.

**caveat**: Major version zero is a special case indicating development version that may make incompatible API changes without incrementing MAJOR version.
