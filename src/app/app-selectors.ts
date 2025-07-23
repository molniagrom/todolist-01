import {ThemeMode} from "./app-reducer.ts";
import {RootState} from "./store.ts";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode;
