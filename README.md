# GraphQL Menu System

This project is a GraphQL API designed for managing restaurant-style menu systems. It allows for managing menus, sections, items, modifiers, and their relationships in a structured way.

## Table of Contents

- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
  - [Menu Queries](#menu-queries)
  - [Section Queries](#section-queries)
  - [Item Queries](#item-queries)
  - [Mutation Examples](#mutation-examples)
- [Problem-Solving and Design Breakdown](#problem-solving-and-design-breakdown)
- [Testing](#testing)

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [Prisma](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/miculino/graphql-menu-system.git
   cd graphql-menu-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env` file with the database URL:

   ```bash
   DATABASE_URL="sqlite:./dev.db"
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

5. (Optional) Seed the database:

   ```bash
   npx prisma db seed
   ```

6. Start the server:

   ```bash
   npm run dev
   ```

The server runs at `http://localhost:4000`.

## API Endpoints

### Menu Queries

- **`menus`**: Retrieve all menus.

  ```graphql
  query {
    menus {
      id
      label
    }
  }
  ```

- **`menu(id: ID!)`**: Retrieve a specific menu by ID.

  ```graphql
  query {
    menu(id: "1") {
      id
      label
    }
  }
  ```

### Section Queries

- **`sections`**: Retrieve all sections.

  ```graphql
  query {
    sections {
      id
      label
    }
  }
  ```

- **`section(id: ID!)`**: Retrieve a specific section by ID.

  ```graphql
  query {
    section(id: "2") {
      id
      label
    }
  }
  ```

### Item Queries

- **`items`**: Retrieve all items.

  ```graphql
  query {
    items {
      id
      label
      price
    }
  }
  ```

- **`item(id: ID!)`**: Retrieve a specific item by ID.

  ```graphql
  query {
    item(id: "1") {
      id
      label
      price
    }
  }
  ```

## Mutation Examples

### Create a Menu

- **`createMenu(label, state, start_date, end_date, sections)`**: Create a new Menu with a relationship to Sections

```graphql
mutation {
  createMenu(
    label: "Lunch Menu"
    state: "active"
    start_date: "2024-01-01"
    end_date: "2024-01-31"
    sections: ["1", "2"]
  ) {
    id
    label
    sections {
      id
      label
    }
  }
}
```

### Update a Menu

- **`updateMenu(id, label, state, start_date, end_date, sections)`**: Update an existing Menu

```graphql
mutation {
  updateMenu(
    id: "1"
    label: "Updated Lunch Menu"
    state: "inactive"
    start_date: "2024-01-01"
    end_date: "2024-01-31"
    sections: ["2", "3"]
  ) {
    id
    label
    sections {
      id
      label
    }
  }
}
```

### Delete a Menu

- **`deleteMenu(id)`**: Delete an entire Menu

```graphql
mutation {
  deleteMenu(id: "1") {
    id
    label
  }
}
```

### Create a Section

- **`createSection(label)`**: Create a new Section

```graphql
mutation {
  createSection(label: "Desserts") {
    id
    label
  }
}
```

### Create an Item

- **`createItem(label, price, type, sections)`**: Create a new Item

```graphql
mutation {
  createItem(
    label: "Pizza Margherita"
    price: 15.99
    type: "Product"
    sections: ["1"]
  ) {
    id
    label
    price
  }
}
```

---

## Problem-Solving and Design Breakdown

### Visualising the GraphQL Request & Data Fetching Flow

![alt text](<GraphQL Request Flow (1).png>)
![alt text](<GraphQL Data Fetching Flow.png>)

### Understanding the Problem

The goal was to build a GraphQL API that would manage a restaurant-style menu system. This involved handling multiple entities like **Menus**, **Sections**, **Items**, **ModifierGroups**, and **Modifiers**, along with their relationships. For example, a menu could have multiple sections, and each section could contain many items, which could further contain multiple modifiers. The challenge was to design a system that could efficiently handle all these relationships while ensuring smooth CRUD operations and robust error handling.

### Thought Process

#### 1. **Starting with GraphQL and Mock Data**

I began by focusing on the **GraphQL schema** first because that would define how I could query and mutate the data. My initial plan was to simulate the real data relationships using mock data in order to quickly validate the GraphQL queries and mutations without having to worry about the underlying database initially.

- **Why Mock Data First?** I chose to start with mock data because it allowed me to quickly set up a schema and validate the structure of the queries and mutations. Since the project was about relationships between entities, I wanted to focus on how these entities would interact and make sure the API could handle real-world queries, like retrieving all menus with their sections and items.
- During this phase, I created mock objects for menus, sections, and items, and tested basic GraphQL queries in **Apollo Explorer** (which I used for testing rather than GraphQL Playground). I tested things like:
  - Retrieving a list of menus with their sections.
  - Adding items to sections.
  - Creating new sections and assigning them to a menu.

This approach gave me confidence that the GraphQL schema and the way entities were being queried and mutated were on the right track before introducing the complexity of a real database.

#### 2. **Transitioning to Prisma for Database Integration**

Once I had the basic GraphQL structure in place and validated the logic with mock data, the next step was integrating **Prisma** to handle the database interactions. At this point, I switched to using a real SQLite database to manage entities and their relationships.

- **Why Prisma?** I chose Prisma because it offers a simple, type-safe, and powerful ORM that can handle complex relationships effortlessly. Prisma’s ability to define relationships (e.g., one-to-many, many-to-many) directly in the schema was essential for managing the intricate connections between menus, sections, items, and modifiers.

I began by designing the **Prisma schema** to match the relationships I had defined in the GraphQL schema. For instance:

- A **Menu** can have many **Sections**, so I used a many-to-many relationship for this.
- A **Section** can have many **Items**, and an **Item** can have many **Modifiers**, which was modeled as many-to-many through the `ModifierGroup`.

Once the database schema was defined, I ran the migrations to set up the database and seeded it with some initial data for testing.

#### 3. **Incremental Implementation and Testing**

As I added new functionality (like creating menus, sections, and items), I tested each part incrementally. Each time I implemented a new resolver or mutation, I tested it immediately using **Apollo Explorer**. This allowed me to quickly validate that the GraphQL API was working as expected, and I was able to simulate real-world scenarios such as:

- Creating a new menu and assigning multiple sections to it.
- Updating sections by adding or removing items.
- Creating items with multiple modifiers.

I was continuously testing and refining the GraphQL queries and mutations during this phase. I did not wait until everything was done to run tests. This step-by-step approach allowed me to catch and fix errors as they occurred, avoiding any unnecessary complexity from building up.

#### 4. **Handling Complex Relationships with Prisma**

As the database schema evolved, I encountered several challenges related to **managing relationships** between entities. For example, I had to ensure that:

- **Items** could be connected to multiple **Sections** without causing data integrity issues.
- **Menus** could have multiple **Sections**, and when updating or deleting them, the associations needed to be maintained correctly.
- When creating new **ModifierGroups** for an **Item**, I needed to ensure that the group was properly linked to the item without breaking existing data.

To handle this, I used Prisma’s **`connect`** and **`disconnect`** methods in the mutations to manage these relationships. For example, when creating a new menu, I used `connect` to add existing sections to the menu.

#### 5. **Challenges and Solutions**

- **Handling Nested Data**: Initially, I faced challenges with managing nested data, particularly when dealing with relations in **create** and **update** operations. For example, when creating a new menu, I needed to handle the creation of sections and their items in a nested way. It took some time to figure out how to handle these deeply nested relationships in Prisma.

  - **Solution**: I used Prisma’s `create` operations that allowed for nested writes, ensuring that sections were created or updated along with the menu, and sections could be connected to items seamlessly.

- **Foreign Key Issues**: As I worked with many-to-many relationships, I encountered several foreign key constraint errors when trying to connect entities that didn’t exist in the database. For example, creating a new menu with a section that didn’t exist would break the operation.

  - **Solution**: I made sure to validate that the referenced sections and items existed in the database before creating or updating any records. I added checks in the resolvers to ensure that invalid IDs weren’t being used.

- **Error Handling and Validation**: Throughout the development, I added **validation** to ensure that only valid data was being inserted or updated. For example, when adding items to sections, I checked if the item existed before associating it with a section. I also added custom error messages to guide users when they made invalid queries or mutations.

#### 6. **Handling Real-World Scenarios**

In the real world, menus are dynamic and may require frequent updates. Therefore, I made sure the API could handle:

- **Menu Updates**: When updating a menu, I ensured that the associated sections could be easily added or removed.
- **Section Deletions**: Deleting a section required removing the connection between the section and its menu and updating the sections in the menu to maintain consistency.

I also used the **Apollo Explorer** tool to simulate different real-world scenarios where data might be changed frequently, and I ensured that the system could handle things like cascading deletes or updates gracefully.

## Testing

### Testing Strategy

The goal of the testing strategy was to ensure the robustness of the GraphQL API by verifying that queries and mutations interact correctly with the database, return expected results, and handle edge cases gracefully. The following testing steps were followed:

1. **Integration Testing**:

   - Tested GraphQL queries and mutations with Apollo Explorer (or GraphQL Playground) to ensure that the entire GraphQL API, including Apollo Server, schema, and resolvers, behaves as expected.
   - All CRUD operations (create, read, update, delete) for entities such as **Menu**, **Section**, **Item**, and **Modifier** were thoroughly tested to ensure correct functionality.
   - Validated that relationships (e.g., menus to sections, items to modifiers) are properly handled in queries and mutations.

2. **Error Handling**:

   - Tested edge cases like invalid IDs, missing required fields, and attempting to delete entities with existing dependencies (e.g., trying to delete a section that is linked to a menu).
   - Ensured proper error messages were returned when incorrect or incomplete data was submitted.

3. **Real-World Scenarios**:

   - Simulated real-world usage of the GraphQL API by testing common queries, like retrieving all menus with their sections and items, and creating new menus with multiple sections.
   - Ensured the API could handle multiple concurrent requests and scale properly as the amount of data grew.

4. **Database Seeding**:

   - Seeded the database with mock data (menus, sections, items, etc.) to ensure that the API works with realistic data, reflecting the kind of scenarios that would happen in a live production environment.
   - Used Prisma's seeding functionality to automate the population of the database with test data.

5. **Manual Testing with Apollo Explorer**:
   - Apollo Explorer (or GraphQL Playground) was used to manually test queries and mutations, making sure that the endpoints were functional and returned the expected results.
   - Various test cases were executed in Apollo Explorer to simulate real-world client requests, ensuring that all possible scenarios were handled appropriately.

### Testing Tools

- **Apollo Server**: Used Apollo's testing capabilities to validate the behavior of the GraphQL API.
- **Prisma**: Ensured that the Prisma ORM was working as expected for querying and manipulating the database.
- **Apollo Explorer / GraphQL Playground**: Utilized these tools to test the GraphQL queries and mutations manually, mimicking how a client would interact with the API.

### Conclusion

The process of implementing the GraphQL API was a great exercise in incremental development and problem-solving. By starting with mock data and focusing on the relationships first, I was able to quickly prototype the GraphQL schema and refine it before moving to Prisma.

I used an iterative approach, making sure that each step I took was functional before moving on to the next. Testing in **Apollo Explorer** allowed me to validate the system as I built it, making sure that real-world scenarios were well-handled and the system was able to scale with new requirements.

Through incremental improvement, I was able to overcome challenges related to data relationships, validation, and error handling, ultimately delivering a robust and flexible API that can manage complex relationships between menus, sections, items, and modifiers.

Let me know if you need further elaboration on any part of the process or if you'd like to explore next steps!
