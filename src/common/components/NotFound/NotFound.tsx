import { Link } from "react-router"
import s from "./PageNotFound.module.css"
import { Button } from "@mui/material"
import { Path } from "@/common/routing"

export const NotFound = () => (
  <>
    <h1 className={s.title}>404</h1>
    <h2 className={s.subtitle}>page not found</h2>
    <p style={{ textAlign: "center" }}>
      <Button
        size="medium"
        variant="contained"
        component={Link}
        to={Path.Main}
      >
        Back to home page
      </Button>
    </p>

  </>
)