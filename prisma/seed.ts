import prisma from '@/lib/db'

async function main() {
  // Limpa dados (opcional, bom pra dev)
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()

  // Cria categorias
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      isActive: true,
    },
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
      isActive: true,
    },
  })

  // Cria marcas
  const apple = await prisma.brand.create({
    data: {
      name: 'Apple',
      slug: 'apple',
      isActive: true,
    },
  })

  const nike = await prisma.brand.create({
    data: {
      name: 'Nike',
      slug: 'nike',
      isActive: true,
    },
  })

  // Cria produtos
  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15',
        description: 'Latest Apple smartphone',
        price: 7500,
        promotionalPrice: 6999,
        sku: 'IP15-001',
        quantity: 10,
        isActive: true,
        categoryId: electronics.id,
        brandId: apple.id,
      },
      {
        name: 'Nike Air Force 1',
        description: 'Classic Nike sneakers',
        price: 899,
        sku: 'NK-AF1',
        quantity: 25,
        isActive: true,
        categoryId: clothing.id,
        brandId: nike.id,
      },
    ],
  })
}

main()
  .then(() => {
    console.log('🌱 Seed executado com sucesso')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
