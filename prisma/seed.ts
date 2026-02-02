import prisma from '@/lib/db'

async function main() {
  // 🧑‍💼 Admin fake (seed)
  const adminProfile = await prisma.profile.upsert({
    where: { userId: 'seed-admin' },
    update: {},
    create: {
      userId: 'seed-admin',
      name: 'Admin',
      role: 'ADMIN',
      storeName: 'Admin Store',
      storeSlug: 'admin-store',
    },
  })

  // 🧹 limpar dados (ordem importa)
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()

  // 📦 Categorias
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
    },
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
    },
  })

  // 🏷️ Marcas
  const apple = await prisma.brand.create({
    data: {
      name: 'Apple',
      slug: 'apple',
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
    },
  })

  const nike = await prisma.brand.create({
    data: {
      name: 'Nike',
      slug: 'nike',
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
    },
  })

  // 🛒 Produtos (create normal, não createMany)
  await prisma.product.create({
    data: {
      name: 'iPhone 15',
      description: 'Latest Apple smartphone',
      price: 7500,
      promotionalPrice: 6999,
      sku: 'IP15-001',
      quantity: 10,
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
      category: {
        connect: { id: electronics.id },
      },
      brand: {
        connect: { id: apple.id },
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Nike Air Force 1',
      description: 'Classic Nike sneakers',
      price: 899,
      sku: 'NK-AF1',
      quantity: 25,
      isActive: true,
      owner: {
        connect: { id: adminProfile.id },
      },
      category: {
        connect: { id: clothing.id },
      },
      brand: {
        connect: { id: nike.id },
      },
    },
  })
}

main()
  .then(() => {
    console.log('🌱 Seed executado com sucesso')
  })
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
