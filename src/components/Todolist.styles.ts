import { SxProps } from '@mui/material'

export const BoxSx: SxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontWeight: isDone ? "normal" : "bold",
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? "line-through" : "none",
})