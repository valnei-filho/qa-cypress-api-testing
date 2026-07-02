describe('Booking API', () => {

  it('should return the booking list', () => {

    cy.request('/booking').then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length.greaterThan(0);

      cy.log(JSON.stringify(response.body));

    });

  });

  it('should return a specific booking', () => {

    cy.request('/booking').then((response) => {

      const bookingId = response.body[0].bookingid;

      cy.request(`/booking/${bookingId}`).then((bookingResponse) => {

        expect(bookingResponse.status).to.eq(200);
        expect(bookingResponse.body).to.have.property('firstname');
        expect(bookingResponse.body).to.have.property('lastname');
        expect(bookingResponse.body).to.have.property('totalprice');
        expect(bookingResponse.body).to.have.property('depositpaid');
        expect(bookingResponse.body).to.have.property('bookingdates');

      });

    });

  });

  it('should create a new booking', () => {

  cy.fixture('booking').then((bookingData) => {

    cy.request({

      method: 'POST',

      url: '/booking',

      body: bookingData,

      }).then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body).to.have.property('bookingid');

        expect(response.body.booking.firstname).to.eq(bookingData.firstname);
        expect(response.body.booking.lastname).to.eq(bookingData.lastname);
        expect(response.body.booking.totalprice).to.eq(bookingData.totalprice);
        expect(response.body.booking.depositpaid).to.eq(bookingData.depositpaid);
        expect(response.body.booking.additionalneeds).to.eq(bookingData.additionalneeds);

        cy.log(JSON.stringify(response.body));

      });

    });

  });

  it('should create and retrieve a booking', () => {

    cy.createBooking().then((response) => {

      const bookingId = response.body.bookingid;

      cy.fixture('booking').then((bookingData) => {

        cy.request(`/booking/${bookingId}`).then((bookingResponse) => {

          expect(bookingResponse.status).to.eq(200);

          expect(bookingResponse.body.firstname).to.eq(bookingData.firstname);
          expect(bookingResponse.body.lastname).to.eq(bookingData.lastname);
          expect(bookingResponse.body.totalprice).to.eq(bookingData.totalprice);
          expect(bookingResponse.body.depositpaid).to.eq(bookingData.depositpaid);
          expect(bookingResponse.body.additionalneeds).to.eq(bookingData.additionalneeds);

        });

      });

    });

  });

  it('should generate auth token', () => {

    cy.generateToken().then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('token');

      cy.log(JSON.stringify(response.body));

    });

  });

  it('should update a booking', () => {

  cy.request({

    method: 'POST',

    url: '/auth',

    body: {

      username: 'admin',

      password: 'password123',

    },

  }).then((authResponse) => {

    const token = authResponse.body.token;

    cy.fixture('booking').then((bookingData) => {

      cy.request({

        method: 'POST',

        url: '/booking',

        body: bookingData,

      }).then((createResponse) => {

        const bookingId = createResponse.body.bookingid;

        cy.request({

          method: 'PUT',

          url: `/booking/${bookingId}`,

          headers: {

            Cookie: `token=${token}`,

          },

          body: {

            firstname: 'João',

            lastname: 'Silva',

            totalprice: 1200,

            depositpaid: false,

            bookingdates: {

              checkin: '2026-08-01',

              checkout: '2026-08-10',

            },

            additionalneeds: 'Lunch',

          },

        }).then((updateResponse) => {

          expect(updateResponse.status).to.eq(200);

          cy.request(`/booking/${bookingId}`).then((bookingResponse) => {

            expect(bookingResponse.status).to.eq(200);

            expect(bookingResponse.body.firstname).to.eq('João');
            expect(bookingResponse.body.lastname).to.eq('Silva');
            expect(bookingResponse.body.totalprice).to.eq(1200);
            expect(bookingResponse.body.depositpaid).to.eq(false);
            expect(bookingResponse.body.additionalneeds).to.eq('Lunch');

          });

        });

      });

    });

  });

});

  it('should delete a booking', () => {

  cy.request({

    method: 'POST',

    url: '/auth',

    body: {

      username: 'admin',

      password: 'password123',

    },

  }).then((authResponse) => {

    const token = authResponse.body.token;

    cy.fixture('booking').then((bookingData) => {

      cy.request({

        method: 'POST',

        url: '/booking',

        body: bookingData,

      }).then((createResponse) => {

        const bookingId = createResponse.body.bookingid;

        cy.request({

          method: 'DELETE',

          url: `/booking/${bookingId}`,

          headers: {

            Cookie: `token=${token}`,

          },

        }).then((deleteResponse) => {

          expect(deleteResponse.status).to.eq(201);

          cy.request({

            method: 'GET',

            url: `/booking/${bookingId}`,

            failOnStatusCode: false,

            }).then((getResponse) => {

              expect(getResponse.status).to.eq(404);

            });

          });

        });

      });

    });

  });
});