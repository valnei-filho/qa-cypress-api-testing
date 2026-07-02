# QA Cypress API Testing

Automated API testing project built with **Cypress** using the **Restful Booker API**. This project demonstrates API automation best practices, including reusable custom commands, fixtures, environment variables, HTML reporting, and clean project organization.

---

## Technologies

- JavaScript (ES6+)
- Cypress
- Node.js
- Mochawesome Reporter
- Git & GitHub

---

## Features

- Retrieve booking list
- Retrieve booking by ID
- Create a new booking
- Retrieve a created booking
- Generate authentication token
- Update an existing booking
- Delete a booking
- Generate HTML execution reports

---

## Project Structure

```text
.
├── cypress
│   ├── e2e
│   │   └── booking.cy.js
│   ├── fixtures
│   │   ├── booking.json
│   │   └── updatedBooking.json
│   ├── reports
│   ├── support
│   │   ├── commands.js
│   │   └── e2e.js
│   └── types
│       └── commands.d.ts
├── cypress.config.js
├── cypress.env.json
├── package.json
└── README.md
```

---

## Custom Commands

To improve maintainability and avoid duplicated code, the project uses custom Cypress commands.

- `cy.generateToken()`
- `cy.createBooking()`
- `cy.updateBooking()`
- `cy.deleteBooking()`

---

## Test Data

Test data is stored in fixtures to make maintenance easier and improve test readability.

- `booking.json`
- `updatedBooking.json`

---

## Reports

The project uses **Mochawesome Reporter** to automatically generate HTML reports after each execution.

After running the tests, the report is available at:

```text
cypress/reports/html/index.html
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/valnei-filho/qa-cypress-api-testing.git
```

Install dependencies:

```bash
npm install
```

---

## Running the Tests

Run in interactive mode:

```bash
npx cypress open
```

Run in headless mode:

```bash
npx cypress run
```

---

## Best Practices Applied

- Custom Commands
- Fixtures for test data
- Environment variables
- HTML reporting
- Reusable test structure
- Reduced code duplication
- Organized project architecture

---

## Future Improvements

- API request validation with JSON Schema
- CI/CD integration using GitHub Actions
- Test execution on multiple environments
- Data generation using Faker.js

---

## Author

**Valnei Rezende**

GitHub:
https://github.com/valnei-filho

---

This project was developed as part of my QA Automation learning journey, focusing on building maintainable and scalable API test automation using Cypress.