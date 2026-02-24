import prisma from '@/lib/db'

async function main() {
  /**
   * ============================
   * 🧑‍💼 ADMIN (SEED)
   * ============================
   */
  const adminProfile = await prisma.profile.upsert({
    where: { userId: 'seed-admin' },
    update: {},
    create: {
      userId: 'seed-admin',
      name: 'Admin',
      role: 'ADMIN',
      storeName: 'Admin Store',
      storeSlug: 'admin-store',
      isActive: true,
    },
  })

  /**
   * ============================
   * 📦 CATEGORIES
   * ============================
   */
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      isActive: true,
      ownerId: adminProfile.id,
    },
  })

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
      isActive: true,
      ownerId: adminProfile.id,
    },
  })

  /**
   * ============================
   * 🏷️ BRANDS
   * ============================
   */
  const apple = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple',
      isActive: true,
      ownerId: adminProfile.id,
    },
  })

  const nike = await prisma.brand.upsert({
    where: { slug: 'nike' },
    update: {},
    create: {
      name: 'Nike',
      slug: 'nike',
      isActive: true,
      ownerId: adminProfile.id,
    },
  })

  /**
   * ============================
   * 🛒 PRODUCTS
   * ============================
   */
  const iphone = await prisma.product.upsert({
    where: { sku: 'IP15-001' },
    update: {},
    create: {
      name: 'iPhone 15',
      description: 'Latest Apple smartphone',
      price: 7500,
      promotionalPrice: 6999,
      sku: 'IP15-001',
      quantity: 10,
      isActive: true,
      ownerId: adminProfile.id,
      categoryId: electronics.id,
      brandId: apple.id,
    },
  })

  const airForce = await prisma.product.upsert({
    where: { sku: 'NK-AF1' },
    update: {},
    create: {
      name: 'Nike Air Force 1',
      description: 'Classic Nike sneakers',
      price: 899,
      sku: 'NK-AF1',
      quantity: 25,
      isActive: true,
      ownerId: adminProfile.id,
      categoryId: clothing.id,
      brandId: nike.id,
    },
  })

  /**
   * ============================
   * 📦 ORDER (OPCIONAL – SEED)
   * ============================
   *
   * Nota: o modelo `Order` não possui um campo `code` no schema,
   * então aqui verificamos por um pedido existente do mesmo dono
   * e com o mesmo subtotal antes de criar um novo.
   */

  const subtotal = Number(iphone.price) + Number(airForce.price)

  const orderExists = await prisma.order.findFirst({
    where: { ownerId: adminProfile.id, subtotal },
  })

  if (!orderExists) {
    await prisma.order.create({
      data: {
        status: 'PAID',
        subtotal,
        total: subtotal,
        ownerId: adminProfile.id,
        items: {
          create: [
            {
              productId: iphone.id,
              name: iphone.name,
              sku: iphone.sku ?? undefined,
              quantity: 1,
              price: iphone.price,
            },
            {
              productId: airForce.id,
              name: airForce.name,
              sku: airForce.sku ?? undefined,
              quantity: 1,
              price: airForce.price,
            },
          ],
        },
      },
    })
  }

  console.log('🌱 Seed executado com sucesso (sem apagar dados)')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
