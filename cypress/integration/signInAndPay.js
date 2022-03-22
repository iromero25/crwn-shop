/// <reference types="Cypress" />

describe("Sign in an existing user --conditionally--", () => {
  // This is not required per se but as an example, I can mock (intercept)
  // the `getUser` request so it finishes immediately:
  before(() => {
    cy.mockGetUserRequest();
    cy.visit("/");
    // checking if the cart-icon is visible is important:  it means  I have
    // finished fetching items from the DB and thus checking a user session
    // is finished. I want user session to be  finished  before potentially
    // try to log in again so to avoid race conditions.
    cy.get(".cart-icon").should("be.visible");
  });

  // Requirements for this test:
  // - The user used to log in needs to have at least one item stored  in  the
  //   current item (the shopping cart) data in the DB: we need to be sure the
  //   request retrieving items is finished before trying to log out. If I try
  //   to log out before successfully finishing that request, the test fails

  // This is a good example of conditional logic in testing:
  // If there's a Sign Out link, be sure of clicking it before doing anything
  it("sign out if required", () => {
    cy.get(".options").then($options => {
      if ($options.find('div.option:contains("SIGN OUT")').length) {
        cy.get("div.options").contains("SIGN OUT").should("be.visible").click();
      }
    });
  });

  it("fill in form and sign in", () => {
    cy.get('[href="/signin"]').should("be.visible").click();
    cy.fillAndSubmitSignInForm();
  });
});

describe("Shopping Cart", () => {
  it("Add first item from Shopping page", () => {
    cy.addFirstItemFromShopPage();
    cy.clickCartIcon();
    cy.get(".cart-items", { timeout: 6000 })
      .first()
      .get(".item-details")
      .should("be.visible");
  });
});

describe("Payment", () => {
  it("checkout page is displayed with at least one item", () => {
    cy.clickGoToCheckoutBtn();
    cy.atLeastOneItemInCheckoutPage({ timeout: 6000 });
  });

  it("display error toast when payment fails", () => {
    cy.intercept("/payment", {
      statusCode: 500,
    });
    cy.get("button.StripeCheckout").click();
    cy.fillStripePaymentForm();

    // `getIframeBody` wraps  a DOM element into a cypress element, meaning
    // we can chain cypress's get command to be sure we asynchronously wait
    // for the error toast to appear
    cy.getIframeBody()
      .get(".Toastify [role=alert]", { timeout: 6000 })
      .should("be.visible");
    cy.atLeastOneItemInCheckoutPage({ timeout: 6000 });
  });

  // it("display successful toast when payment succeeds", () => {});
});
