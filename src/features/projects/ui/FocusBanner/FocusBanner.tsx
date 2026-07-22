import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong"
import styles from "./FocusBanner.module.css"

type Props = {
  projectTitle: string
  onExitFocus: () => void
}

export const FocusBanner: FC<Props> = ({ projectTitle, onExitFocus }) => {
  return (
    <Paper elevation={3} className={styles.banner}>
      <Box className={styles.info}>
        <CenterFocusStrongIcon />
        <Typography variant="subtitle1">
          Фокус-режим: <strong>{projectTitle}</strong>
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        onClick={onExitFocus}
        className={styles.exitButton}
      >
        Выйти из фокуса
      </Button>
    </Paper>
  )
}
