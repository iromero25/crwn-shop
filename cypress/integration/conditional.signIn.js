/// <reference types="Cypress" />

describe("Sign in an existing user --conditionally--", () => {
  // This is not required per se but as an example, I can mock (intercept)
  // the `getUser` request so it finishes immediately:
  beforeEach(() => {
    cy.intercept("/getUser", {
      statusCode: 200,
      fixture: "user",
    });
    cy.visit("/");
    cy.get(".cart-icon").should("be.visible");
  });

  // Requirements for this test:
  // - The user used to log in needs to have at least one item stored  in  the
  //   current item (the shooping cart) data in the DB: we need to be sure the
  //   request retrieving items is finished before trying to log out. If I try
  //   to log out before successfully finishing that request, the test fails

  // This is a good example of conditional logic in testing:
  // If there's a Sign Out link, be sure of clicking it before doing anything
  it("sign out if required", () => {
    cy.get(".options").then($options => {
      if ($options.find('div.option:contains("SIGN OUT")').length) {
        cy.clickCartIcon();
        cy.get(".cart-items").first().get(".item-details").should("be.visible");
        cy.get("div.options").contains("SIGN OUT").should("be.visible").click();
        cy.get(".cart-icon").trigger("click");
      }
    });
  });

  it("fill in form and sign in", () => {
    cy.get('[href="/signin"]').should("be.visible").click();
    cy.fixture("userToSignIn").then(({ email, password }) => {
      cy.get(".sign-in form [name=email]").should("be.visible").type(email);
      cy.get(".sign-in form [name=password]").should("be.visible").type(password);
      cy.get('.sign-in button[type="submit"]').click();
    });
  });
});
