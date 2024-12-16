// TESTING PURPOSES ONLY
// Mock data to simulate a database

export const mockMenus = [
  {
    id: "1",
    identifier: "breakfast-menu",
    label: "Breakfast Menu",
    start_date: "20/02/2024",
    end_date: "23/02/2024",
  },
  {
    id: "2",
    identifier: "dinner-menu",
    label: "Dinner Menu",
    start_date: "20/02/2024",
    end_date: "23/02/2024",
  },
];

export const mockSections = [
  { id: "1", identifier: "appetizers", label: "Appetizers" },
  { id: "2", identifier: "mains", label: "Main Courses" },
];

// Represnes the many-to-many relationship between Menu and Section entities.
export const mockMenuSections = [
  { menuId: "1", sectionId: "1" },
  { menuId: "1", sectionId: "2" },
  { menuId: "2", sectionId: "2" },
];
