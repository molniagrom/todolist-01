import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Skeleton from "@mui/material/Skeleton"
import Box from "@mui/material/Box"
import styles from "./ProjectCardSkeleton.module.css"

export const ProjectCardSkeleton = () => {
  return (
    <Card className={styles.card}>
      <Box className={styles.strip} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={8} className={styles.progressSkeleton} />
        <Skeleton variant="text" width="40%" height={20} className={styles.statsSkeleton} />
        <Box className={styles.actions}>
          <Skeleton variant="rectangular" width={80} height={36} className={styles.actionSkeleton} />
          <Skeleton variant="rectangular" width={80} height={36} className={styles.actionSkeleton} />
        </Box>
      </CardContent>
    </Card>
  )
}
