import {SxProps} from "@mui/material";

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontWeight: isDone ? "normal" : "bold",
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? "line-through" : "none",
})