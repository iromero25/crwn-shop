// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("clickCartIcon", () => {
  cy.get(".cart-icon").trigger("click");
  cy.get(".cart-dropdown").should("be.visible");
});

Cypress.Commands.add("clickGoToCheckoutBtn", () => {
  cy.get(".cart-dropdown .custom-button").click();
});

Cypress.Commands.add("fillAndSubmitSignInForm", () => {
  cy.fixture("userToSignIn").then(({ email, password }) => {
    cy.get(".sign-in form [name=email]").type(email);
    cy.get(".sign-in form [name=password]").type(password);
    cy.get('.sign-in button[type="submit"]').click();
  });
});

Cypress.Commands.add("addFirstItemFromShopPage", () => {
  cy.get('[href="/shop"]').click();
  cy.get(":nth-child(1) > .preview > :nth-child(1) > .image").realHover();
  cy.contains(/add to cart/i).click({ force: true });
});

Cypress.Commands.add("atLeastOneItemInCheckoutPage", () => {
  cy.get(".checkout-page .checkout-item").should("have.length.at.least", 1);
});

Cypress.Commands.add("fillStripePaymentForm", () => {
  const fillAndSubmitForm = (fieldSpec, data) => {
    Object.keys(fieldSpec).forEach(paymentDetail => {
      const formFieldId = fieldSpec[paymentDetail];
      const formValue = data[paymentDetail];
      cy.getIframeBody().find(formFieldId).clear().type(formValue);
    });
    cy.getIframeBody().find("#submitButton").click();
  };

  cy.fixture("paymentDetails").then(paymentData => {
    fillAndSubmitForm(
      {
        displayName: "#shipping-name",
        address: "#shipping-street",
        zip: "#shipping-zip",
        city: "#shipping-city",
        email: "#email",
      },
      paymentData
    );

    fillAndSubmitForm(
      {
        cardNumber: "#card_number",
        expires: "#cc-exp",
        cvc: "#cc-csc",
      },
      paymentData
    );
  });
});

Cypress.Commands.add("mockGetUserRequest", () => {
  cy.intercept("/getUser", {
    statusCode: 200,
    fixture: "user",
  });
});

Cypress.Commands.add("getIframeBody", () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get("iframe")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  );
});
