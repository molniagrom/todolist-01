import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Avatar from "@mui/material/Avatar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import LayersIcon from "@mui/icons-material/Layers"
import RefreshIcon from "@mui/icons-material/Refresh"
import BarChartIcon from "@mui/icons-material/BarChart"
import TuneIcon from "@mui/icons-material/Tune"
import CampaignIcon from "@mui/icons-material/Campaign"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import styles from "./KanbanToolbar.module.css"

type Props = {
  projectTitle: string
  projectColor: string
  searchQuery: string
  onSearchChange: (query: string) => void
  onBack: () => void
}

export const KanbanToolbar: FC<Props> = ({
  projectTitle,
  projectColor,
  searchQuery,
  onSearchChange,
  onBack,
}) => {
  return (
    <Box className={styles.toolbar}>
      <Box className={styles.leftBlock}>
        <IconButton onClick={onBack} className={styles.backButton}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box className={styles.projectIndicator} style={{ backgroundColor: projectColor }} />

        <Typography variant="h6" className={styles.projectTitle}>
          {projectTitle}
        </Typography>

        <TextField
          size="small"
          placeholder="Поиск на доске"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchField}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#9e9ea4" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box className={styles.avatarStack}>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#3c3d42" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9e9ea4">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Avatar>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#fa8c16" }}>U</Avatar>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#1890ff" }}>AB</Avatar>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#1890ff" }}>IL</Avatar>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#52c41a" }}>V</Avatar>
          <Avatar className={styles.avatar} sx={{ bgcolor: "#fa8c16" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Avatar>
        </Box>

        <Button size="small" startIcon={<FilterListIcon />} className={styles.filterButton}>
          Фильтр
        </Button>

        <Button size="small" startIcon={<LayersIcon />} className={styles.filterButton}>
          Группа
        </Button>
      </Box>

      <Box className={styles.rightBlock}>
        <Button variant="contained" className={styles.sprintButton}>
          Завершить спринт
        </Button>

        <IconButton className={styles.utilityButton}>
          <RefreshIcon fontSize="small" />
        </IconButton>
        <IconButton className={styles.utilityButton}>
          <BarChartIcon fontSize="small" />
        </IconButton>
        <IconButton className={styles.utilityButton}>
          <TuneIcon fontSize="small" />
        </IconButton>
        <IconButton className={styles.utilityButton}>
          <CampaignIcon fontSize="small" />
        </IconButton>
        <IconButton className={styles.utilityButton}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
