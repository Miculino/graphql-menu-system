const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const mainMenu = await prisma.menu.create({
    data: {
      id: 1,
      label: "Mrs Kueh Menu",
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-12-31"),
    },
  });

  const nonConfigurableSection = await prisma.section.create({
    data: {
      id: 2,
      label: "Platters",
      display_order: 1,
      isAvailable: false,
    },
  });

  const configurableSection = await prisma.section.create({
    data: {
      id: 3,
      label: "Kuehs & Cakes",
      display_order: 2,
    },
  });

  const treatsSection = await prisma.section.create({
    data: {
      id: 4,
      label: "Mrs Kueh Treats",
      display_order: 3,
    },
  });

  await prisma.menuSection.createMany({
    data: [
      { menuId: mainMenu.id, sectionId: nonConfigurableSection.id },
      { menuId: mainMenu.id, sectionId: configurableSection.id },
      { menuId: mainMenu.id, sectionId: treatsSection.id },
    ],
  });

  const favourites = await prisma.item.create({
    data: {
      id: 4,
      label: "Mrs Kueh's Favourites",
      description:
        "<p>Includes:<br/>3 pieces of Kueh Salat<br/>3 pieces of Bingka Ubi<br/>3 pieces of Ondeh Ondeh<br/>3 pieces of Putri Ayu<br/>Kueh Kosui</p><p></p>",
      price: 35.0,
      type: "Product",
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/96ge6mejk4qmanfhr9u67h9hfshn",
      display_order: 0,
    },
  });

  const loveBasket = await prisma.item.create({
    data: {
      id: 5,
      label: "Mrs Kueh's Love Basket",
      description:
        "Just like mama's love for us, the Love Basket is overflowing with goodness and delicious things. A hand woven basket mat is filled with a selection of our favourite kueh kueh - and in the crowning centre a very special orange chiffon cake. Made specially for the Mothers' Day weekend, the orange chiffon cake is a special treat of our family and we hope that it will be for yours too.",
      price: 35.0,
      type: "Product",
      display_order: 1,
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/62map8rbqu6mjf1y6c1kav8d5ndh",
    },
  });

  const kuehSalat = await prisma.item.create({
    data: {
      id: 6,
      label: "Kueh Salat",
      description:
        "Specially sourced gula melaka provides the salty and toasted notes as the perfect complement to the bliss of 100% pure Mao Shan Wang durian. The soft glutinous rice layer is also made with pulut hitam for a nutty textural contrast.<br/><br/>Eat in small slices with durian puree atop or on the side as you would cake and cream. Cake Dimensions: 5 by 5 inch rectangle; 200g pure Mao Shan Wang durian<br/><br/><b>Pick up time is between 12 to 7pm.</b>",
      price: 42.0,
      type: "Product",
      display_order: 0,
      isAvailable: false,
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/zw8m8fyv92m145ysfrt70ckz245u",
    },
  });

  const brandyAlmondSugeeCake = await prisma.item.create({
    data: {
      id: 7,
      label: "Brandy Almond Sugee Cake (Petite square)",
      description:
        "A deceptively simple cake, the OG sugee cake is notoriously difficult to master. We start with whole almonds that are lightly toasted by hand, after which they are ground in-house to a precise size and sifted to separate the meal. Lots of good brandy and experience are both essential to taking this cake to perfection. A connoisseur's delight indeed. Dimension 5-inch square Cancellation must be made at least 3 working days in advance prior to pick up date.",
      price: 46.0,
      type: "Product",
      display_order: 1,
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/wlgbp7273an264kp7gtqy5yxsgua",
    },
  });

  const gulaMelaka = await prisma.item.create({
    data: {
      id: 8,
      label: "Gula Melaka",
      description:
        "Perfect for nutty days when everything feels crazy, when your emotions feel scattered. This home-made cereal will nourish you and give you strength. Made with a mother's love, natural sugars and cold pressed coconut oil, this magic mix of nuts, seeds, nuts and grains will see you through any day.</br> Enjoy over yoghurt, on ice cream, with cold milk or as a nutritious snack on its own.</br></br>Ingredients: Oats, Pumpkin Seeds, Sunflower Seeds, Almonds, Cashews, Coconut Palm Sugar, Cold Pressed Coconut Oil, Brown Sugar, Salt.</br></br>Vegan friendly. Dairy free. Contains nuts.</br></br>Size: 350g",
      price: 18.0,
      type: "Product",
      display_order: 0,
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/apshv53rcfla9p4r25lx0i7vl5mc",
    },
  });

  const orangeGrapefruitLimeMarmalde = await prisma.item.create({
    data: {
      id: 9,
      label: "Orange Grapefruit Lime Marmalde",
      description:
        "Perfect for happy days when the sun is shining on your back. When the house is filled with laughter, and no one is asking you where is their pants. You have a moment to savour the golden spread on your warm sourdough, the burst of citrus blooms suddenly and you wish the moment could last forever. Your heart is filled with gratitude that you are alive.</br>Eat with your favourite toast and crackers, or make warm tea or a fizzy drink with soda water.</br></br>Ingredients: Water, Sugar, Orange, Grapefruit, Lime, Lemon, Cointreau.</br></br>Size: 240g",
      price: 12.0,
      type: "Product",
      display_order: 1,
      thumbnail_url:
        "https://mrskueh.com/assets/images/atlas-core-active-storage/5u9hzl1dfochn7mffhnl8win1yml",
    },
  });

  await prisma.sectionItem.createMany({
    data: [
      { sectionId: nonConfigurableSection.id, itemId: favourites.id },
      { sectionId: nonConfigurableSection.id, itemId: loveBasket.id },
      { sectionId: configurableSection.id, itemId: kuehSalat.id },
      { sectionId: configurableSection.id, itemId: brandyAlmondSugeeCake.id },
      { sectionId: treatsSection.id, itemId: gulaMelaka.id },
      { sectionId: treatsSection.id, itemId: orangeGrapefruitLimeMarmalde.id },
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
