import { SxProps } from "@mui/material"

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: { xs: "8px 8px 8px 0", sm: "8px 16px 8px 0" },
  justifyContent: "space-between",
  opacity: isDone ? 0.5 : 1,
  overflow: "hidden",
})