import { Button, Stack } from '@mui/material'

export default function Products() {
  return (
    <div>
      <h1>Products Page</h1>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </div>
  )
}
