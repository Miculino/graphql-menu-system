// TESTING PURPOSES ONLY
// Mock data to simulate a restaurant database

// Menus (e.g., Breakfast, Dinner)
export const mockMenus = [
  {
    identifier: "1",
    label: "Breakfast Menu",
    start_date: "2024-02-20",
    end_date: "2024-02-23",
  },
  {
    identifier: "2",
    label: "Dinner Menu",
    start_date: "2024-02-20",
    end_date: "2024-02-23",
  },
];

// Sections (e.g., Appetizers, Mains, Desserts)
export const mockSections = [
  {
    identifier: "1",
    label: "Appetizers",
  },
  {
    identifier: "2",
    label: "Main Courses",
  },
  {
    identifier: "3",
    label: "Desserts",
  },
];

// Represents the many-to-many relationship between Menu and Section
export const mockMenuSections = [
  { menuId: "1", sectionId: "1" }, // Breakfast Menu -> Appetizers
  { menuId: "1", sectionId: "2" }, // Breakfast Menu -> Main Courses
  { menuId: "2", sectionId: "2" }, // Dinner Menu -> Main Courses
  { menuId: "2", sectionId: "3" }, // Dinner Menu -> Desserts
];

// Items
export const mockItems = [
  {
    type: "Product",
    identifier: "100",
    label: "Scrambled Eggs",
    description: "Classic fluffy scrambled eggs served with toast",
    price: 5.99,
  },
  {
    type: "Product",
    identifier: "101",
    label: "Pancakes with Syrup",
    description: "Stack of pancakes served with maple syrup and butter",
    price: 7.99,
  },
  {
    type: "Product",
    identifier: "200",
    label: "Grilled Salmon",
    description: "Freshly grilled salmon with a side of vegetables",
    price: 18.99,
  },
  {
    type: "Product",
    identifier: "201",
    label: "Steak and Fries",
    description: "Juicy steak served with golden fries and salad",
    price: 22.99,
  },
  {
    type: "Product",
    identifier: "300",
    label: "Chocolate Lava Cake",
    description: "Warm molten chocolate cake served with ice cream",
    price: 8.99,
  },
];

// Represents the many-to-many relationship between Section and Item
export const mockSectionItems = [
  { sectionId: "1", itemId: "100" }, // Appetizers -> Scrambled Eggs
  { sectionId: "1", itemId: "101" }, // Appetizers -> Pancakes
  { sectionId: "2", itemId: "200" }, // Main Courses -> Grilled Salmon
  { sectionId: "2", itemId: "201" }, // Main Courses -> Steak and Fries
  { sectionId: "3", itemId: "300" }, // Desserts -> Chocolate Lava Cake
];

// Modifier Groups (e.g., Pizza Sizes, Extra Toppings)
export const mockModifierGroups = [
  {
    id: "1",
    identifier: "1",
    label: "Pizza Sizes",
    selection_required_min: 1,
    selection_required_max: 1,
  },
  {
    id: "2",
    identifier: "2",
    label: "Extra Toppings",
    selection_required_min: 0,
    selection_required_max: 3,
  },
];

// Modifiers (e.g., 10-inch size, Extra Cheese)
// Connected to both Item and ModifierGroup via itemId and modifierGroupId
export const mockModifiers = [
  {
    itemId: "100",
    modifierGroupId: "1",
    display_order: 1,
    default_quantity: 1,
    price_override: 0,
    name: "10-inch",
  },
  {
    itemId: "100",
    modifierGroupId: "1",
    display_order: 2,
    default_quantity: 0,
    price_override: 2.0,
    name: "12-inch",
  },
  {
    itemId: "100",
    modifierGroupId: "2",
    display_order: 1,
    default_quantity: 0,
    price_override: 1.5,
    name: "Extra Cheese",
  },
  {
    itemId: "100",
    modifierGroupId: "2",
    display_order: 2,
    default_quantity: 0,
    price_override: 2.0,
    name: "Pepperoni",
  },
  {
    itemId: "200",
    modifierGroupId: "1",
    display_order: 1,
    default_quantity: 1,
    price_override: 0,
    name: "Standard Size",
  },
];
