import { TextField, TextFieldProps } from '@mui/material'

export default function FormTextField(props: TextFieldProps) {
  return <TextField {...props} InputLabelProps={{ shrink: true }} />
}
