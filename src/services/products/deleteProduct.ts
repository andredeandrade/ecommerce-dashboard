export async function deleteProduct(id: number) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Erro ao deletar o produto')
  }

  return res.json()
}
