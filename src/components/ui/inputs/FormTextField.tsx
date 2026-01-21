import { TextField, TextFieldProps, Skeleton } from '@mui/material'

type FormTextFieldProps = TextFieldProps & {
  isLoading?: boolean
  skeletonHeight?: number
}

export default function FormTextField({
  isLoading = false,
  skeletonHeight = 40,
  InputLabelProps,
  multiline,
  rows,
  ...props
}: FormTextFieldProps) {
  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        height={multiline ? Number(rows ?? 4) * 24 : skeletonHeight}
      />
    )
  }

  return (
    <TextField
      {...props}
      multiline={multiline}
      rows={rows}
      InputLabelProps={{
        shrink: true,
        ...InputLabelProps,
      }}
    />
  )
}
