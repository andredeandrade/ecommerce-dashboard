import { Button, HStack } from '@chakra-ui/react'

export default function Product() {
  return (
    <div>
      <h1>Product Page</h1>
      <HStack gap="4" mt="10" ml="4">
        <Button variant="outline">Click me</Button>
        <Button colorPalette="green">Click me</Button>
      </HStack>
    </div>
  )
}
