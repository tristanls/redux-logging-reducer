"use strict";

const FIELD_NAME = "@@redux-logging-reducer/log";

const log = (state, fieldName = FIELD_NAME) => state[FIELD_NAME];

const logging = (reducer, fieldName = FIELD_NAME) => (state, action) =>
{
    const nextState = reducer(state, action);
    nextState[fieldName] = nextState[fieldName] || [];
    if (!action.type.startsWith("@@redux"))
    {
        nextState[fieldName].push(action);
    }
    return nextState;
};

const noLog = (state, fieldName = FIELD_NAME) =>
{
    const st = Object.assign({}, state);
    delete st[fieldName];
    return st;
};

module.exports =
{
    log,
    logging,
    noLog
};
