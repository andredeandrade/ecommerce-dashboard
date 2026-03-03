export async function deleteBrand(id: string) {
  const response = await fetch(`/api/brand/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao deletar marca')
  }

  return response.json()
}
