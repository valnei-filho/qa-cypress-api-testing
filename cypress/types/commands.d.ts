declare namespace Cypress {
  interface Chainable {
    generateToken(): Chainable<Cypress.Response>;

    createBooking(): Chainable<Cypress.Response>;

    updateBooking(
      bookingId: number,
      token: string,
      body: object
    ): Chainable<Cypress.Response>;

    deleteBooking(
      bookingId: number,
      token: string
    ): Chainable<Cypress.Response>;
  }
}