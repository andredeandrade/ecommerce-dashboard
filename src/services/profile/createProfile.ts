type CreateProfileInput = {
  userId: string
  name?: string
  storeName?: string
}

export async function createProfile(data: CreateProfileInput) {
  const response = await fetch('/api/profile/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar perfil')
  }

  return response.json()
}
