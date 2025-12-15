
import {configureStore} from "@reduxjs/toolkit";
import {baseAPI} from "@/redux/api";

export const store = configureStore({
    reducer: {
        [baseAPI.reducerPath]: baseAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPI.middleware),
});
