describe('Booking API', () => {

  let token;

  beforeEach(() => {

    cy.generateToken().then((authResponse) => {

      token = authResponse.body.token;

    });

  });

  it('should return the booking list', () => {

    cy.request({

      method: 'GET',

      url: '/booking',

    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length.greaterThan(0);

    });

  });

  it('should return a specific booking', () => {

    cy.request({

      method: 'GET',

      url: '/booking',

    }).then((response) => {

      const bookingId = response.body[0].bookingid;

      cy.request({

        method: 'GET',

        url: `/booking/${bookingId}`,

      }).then((bookingResponse) => {

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

      });

    });

  });

  it('should create and retrieve a booking', () => {

    cy.createBooking().then((createResponse) => {

      const bookingId = createResponse.body.bookingid;
      const booking = createResponse.body.booking;

      cy.request({

        method: 'GET',

        url: `/booking/${bookingId}`,

      }).then((bookingResponse) => {

        expect(bookingResponse.status).to.eq(200);

        expect(bookingResponse.body.firstname).to.eq(booking.firstname);
        expect(bookingResponse.body.lastname).to.eq(booking.lastname);
        expect(bookingResponse.body.totalprice).to.eq(booking.totalprice);
        expect(bookingResponse.body.depositpaid).to.eq(booking.depositpaid);
        expect(bookingResponse.body.additionalneeds).to.eq(booking.additionalneeds);

      });

    });

  });

  it('should generate auth token', () => {

    cy.generateToken().then((authResponse) => {

      expect(authResponse.status).to.eq(200);

      expect(authResponse.body).to.have.property('token');

    });

  });

  it('should update a booking', () => {

    cy.createBooking().then((createResponse) => {

      const bookingId = createResponse.body.bookingid;

      cy.fixture('updatedBooking').then((updatedBooking) => {

        cy.updateBooking(

        bookingId,

        token,

        updatedBooking

        ).then((updateResponse) => {

          expect(updateResponse.status).to.eq(200);

          cy.request({

          method: 'GET',

          url: `/booking/${bookingId}`,

          }).then((bookingResponse) => {

            expect(bookingResponse.status).to.eq(200);

            expect(bookingResponse.body.firstname).to.eq(updatedBooking.firstname);
            expect(bookingResponse.body.lastname).to.eq(updatedBooking.lastname);
            expect(bookingResponse.body.totalprice).to.eq(updatedBooking.totalprice);
            expect(bookingResponse.body.depositpaid).to.eq(updatedBooking.depositpaid);
            expect(bookingResponse.body.additionalneeds).to.eq(updatedBooking.additionalneeds);

          });

        });

      });

    });

  });

  it('should delete a booking', () => {

    cy.createBooking().then((createResponse) => {

      const bookingId = createResponse.body.bookingid;

      cy.deleteBooking(

      bookingId,

      token

      ).then((deleteResponse) => {

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