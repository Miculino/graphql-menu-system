// Mock data for demonstration
const menus = [
  {
    id: "1",
    identifier: "breakfast-menu",
    label: "Breakfast Menu",
    state: "active",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
  },
  {
    id: "2",
    identifier: "dinner-menu",
    label: "Dinner Menu",
    state: "inactive",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
  },
];

export const menuResolvers = {
  Query: {
    menus: () => menus,
  },
};
