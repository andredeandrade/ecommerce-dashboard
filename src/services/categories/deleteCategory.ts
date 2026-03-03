export async function deleteCategory(id: string) {
  const res = await fetch(`/api/category/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Erro ao deletar a categoria')
  }

  return res.json()
}
