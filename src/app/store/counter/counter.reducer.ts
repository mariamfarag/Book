import { createReducer, on } from "@ngrx/store";
import { increaseCounter } from "./counter.action";

const initialState = 0;
const counterReducer = createReducer(
    initialState,
    on(
        increaseCounter,
        (state) => state + 1
    )

)