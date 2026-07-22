import { forwardRef, useImperativeHandle } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { PROJECT_COLORS } from "../../lib/constants"
import styles from "./CreateProjectForm.module.css"

const projectSchema = z.object({
  title: z.string().min(1, "Введите название проекта"),
  description: z.string().optional(),
  color: z.string(),
  deadline: z.string().optional(),
})

export type ProjectFormInputs = z.infer<typeof projectSchema>

type Props = {
  defaultValues?: Partial<ProjectFormInputs>
  onSubmit: (data: ProjectFormInputs) => void
}

export type FormRef = {
  submit: () => void
}

export const CreateProjectForm = forwardRef<FormRef, Props>(({ defaultValues, onSubmit }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      color: PROJECT_COLORS[0],
      deadline: "",
      ...defaultValues,
    },
  })

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)()
    },
  }))

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        label="Название проекта"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register("title")}
      />

      <TextField
        label="Описание (необязательно)"
        fullWidth
        multiline
        rows={3}
        {...register("description")}
      />

      <Box>
        <Typography variant="body2" gutterBottom>
          Цвет проекта
        </Typography>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Box className={styles.colorPicker}>
              {PROJECT_COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => field.onChange(color)}
                  className={`${styles.colorCircle} ${field.value === color ? styles.colorCircleSelected : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </Box>
          )}
        />
      </Box>

      <TextField
        label="Дедлайн (необязательно)"
        type="date"
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("deadline")}
      />
    </Box>
  )
})
