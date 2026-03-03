export async function fetchCustomerById(id: string) {
  const res = await fetch(`/api/customer/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar cliente')
  return res.json()
}
