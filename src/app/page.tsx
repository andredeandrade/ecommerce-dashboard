import { Box } from '@mui/material'
import LoginCard from './_login/_components/LoginCard'

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fafafa"
    >
      <Box
        width={{ xs: '100%', md: '40%' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <LoginCard />
      </Box>
    </Box>
  )
}
