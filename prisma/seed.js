const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const mainMenu = await prisma.menu.create({
    data: {
      id: 1,
      label: "Main Menu",
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-12-31"),
    },
  });

  const nonConfigurableSection = await prisma.section.create({
    data: {
      id: 2,
      label: "Non-Configurable Items",
    },
  });

  const configurableSection = await prisma.section.create({
    data: {
      id: 3,
      label: "Configurable Items",
    },
  });

  await prisma.menuSection.createMany({
    data: [
      { menuId: mainMenu.id, sectionId: nonConfigurableSection.id },
      { menuId: mainMenu.id, sectionId: configurableSection.id },
    ],
  });

  const soup = await prisma.item.create({
    data: {
      id: 4,
      label: "Tomato Soup",
      description: "Rich and creamy tomato soup",
      price: 5.99,
      type: "Product",
    },
  });

  const salad = await prisma.item.create({
    data: {
      id: 5,
      label: "Caesar Salad",
      description: "Classic Caesar salad with croutons",
      price: 7.99,
      type: "Product",
    },
  });

  await prisma.sectionItem.createMany({
    data: [
      { sectionId: nonConfigurableSection.id, itemId: soup.id },
      { sectionId: nonConfigurableSection.id, itemId: salad.id },
    ],
  });

  const burger = await prisma.item.create({
    data: {
      id: 6,
      label: "Build-Your-Own Burger",
      description: "Customizable burger with various toppings",
      price: 10.99,
      type: "Product",
    },
  });

  const pizza = await prisma.item.create({
    data: {
      id: 7,
      label: "Build-Your-Own Pizza",
      description: "Customizable pizza with toppings of your choice",
      price: 15.99,
      type: "Product",
    },
  });

  await prisma.sectionItem.createMany({
    data: [
      { sectionId: configurableSection.id, itemId: burger.id },
      { sectionId: configurableSection.id, itemId: pizza.id },
    ],
  });

  const burgerToppings = await prisma.modifierGroup.create({
    data: {
      id: 8,
      label: "Burger Toppings",
      selection_required_min: 1,
      selection_required_max: 3,
    },
  });

  const pizzaSizes = await prisma.modifierGroup.create({
    data: {
      id: 9,
      label: "Pizza Sizes",
      selection_required_min: 1,
      selection_required_max: 1,
    },
  });

  await prisma.modifier.createMany({
    data: [
      {
        name: "Lettuce",
        default_quantity: 1,
        price_override: 0,
        display_order: 1,
        itemId: burger.id,
        modifierGroupId: burgerToppings.id,
      },
      {
        name: "Tomato",
        default_quantity: 1,
        price_override: 0,
        display_order: 2,
        itemId: burger.id,
        modifierGroupId: burgerToppings.id,
      },
      {
        name: "Cheese",
        default_quantity: 0,
        price_override: 1.5,
        display_order: 3,
        itemId: burger.id,
        modifierGroupId: burgerToppings.id,
      },
    ],
  });

  await prisma.modifier.createMany({
    data: [
      {
        name: "10-inch",
        default_quantity: 1,
        price_override: 0,
        display_order: 1,
        itemId: pizza.id,
        modifierGroupId: pizzaSizes.id,
      },
      {
        name: "12-inch",
        default_quantity: 0,
        price_override: 2.0,
        display_order: 2,
        itemId: pizza.id,
        modifierGroupId: pizzaSizes.id,
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
