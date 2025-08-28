import { selectAppError, setAppErrorAC } from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import Alert from "@mui/material/Alert"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { type SyntheticEvent } from "react"

export const ErrorSnackbar = () => {

  const dispatch = useAppDispatch()

  const error = useAppSelector(selectAppError) // 'error message' | null

  const handleClose = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return
    dispatch(setAppErrorAC({ error: null }))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  )
}