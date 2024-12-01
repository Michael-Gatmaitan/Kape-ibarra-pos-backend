import prisma from "../config/db";

async function seedDatabase() {
  const role = await prisma.role.findFirst({
    where: {
      roleName: { in: ["Cashier", "Barista", "Customer"] },
    },
  });

  if (!role?.id) {
    await prisma.role.createMany({
      data: [
        { roleName: "Manager" },
        { roleName: "Cashier" },
        { roleName: "Barista" },
      ],
    });

    console.log("Roles created");
  }

  const systemPh = await prisma.employee.findFirst({
    where: { id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e" },
  });

  if (!systemPh) {
    await prisma.employee.create({
      data: {
        id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e",
        firstname: "System",
        lastname: "System",
        phoneNumber: "System",
        imagePath: "",
        username: "sys",
        password: "sys",
        role: {
          create: {
            roleName: "System",
          },
        },
      },
    });
  }

  const employee = await prisma.employee.findFirst({
    where: { username: "micheal29" },
  });

  if (!employee?.id) {
    await prisma.employee.create({
      data: {
        firstname: "Michael",
        lastname: "Gatmaitan",
        username: "micheal29",
        password: "michealgatmaitan",
        phoneNumber: "09499693314",
        role: {
          create: {
            roleName: "Admin",
          },
        },
        imagePath: "",
      },
    });
  }

  // Sample customer
  const customer = await prisma.customer.findFirst();
  if (!customer) {
    await prisma.customer.create({
      data: {
        email: "fidelrevo@gmail.com",
        firstname: "Fidel",
        lastname: "Revo",
        username: "remvo123",
        password: "fidelrevo123",
        phoneNumber: "09123456789",
        gender: "Male",
      },
    });
  }

  const category = await prisma.category.findFirst();
  if (!category) {
    await prisma.category.createMany({
      data: [
        { categoryName: "Coffee" },
        { categoryName: "Non-Coffee" },
        { categoryName: "Milk tea" },
      ],
    });
  }

  const rawMaterials = await prisma.rawMaterial.findFirst();
  if (!rawMaterials?.id) {
    await prisma.rawMaterial.createMany({
      data: [
        { materialName: "Milk", quantityInUnitPerItem: 1000, rawPrice: 100 },
        {
          materialName: "Coffee grounds",
          quantityInUnitPerItem: 1000,
          rawPrice: 800,
        },
        {
          materialName: "Whip Cream",
          quantityInUnitPerItem: 1000,
          rawPrice: 120,
        },
        { materialName: "Cups", quantityInUnitPerItem: 50, rawPrice: 50 },
        { materialName: "Straw", quantityInUnitPerItem: 50, rawPrice: 50 },
        { materialName: "Water", quantityInUnitPerItem: 5000, rawPrice: 30 },
      ],
    });

    console.log("Raw materials created");
  }
}

seedDatabase()
  .then(() => {
    console.log("Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
