import { configureStore } from '@reduxjs/toolkit'
import {facultyApi} from "@/lib/features/admin/faculty";


export const makeStore = () => {
    return configureStore({
        reducer: {
            [facultyApi.reducerPath]: facultyApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(facultyApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
