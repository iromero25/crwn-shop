/// <reference types="Cypress" />

describe("Dropdown Cart Items", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("droprown should be visible when the shopping icon is clicked", () => {
    // this can be reused:
    const s: string = "";
    cy.get(".cart-icon").should("be.visible");
    cy.get(".cart-dropdown").should("not.exist");
    cy.get(".cart-icon").trigger("click").get(".cart-dropdown").should("be.visible");
  });

  it("button inside dropdown should change color when hovered", () => {
    const blackColor = "rgb(0, 0, 0)";
    const whiteColor = "rgb(255, 255, 255)";

    cy.get(".cart-icon").trigger("click");

    cy.get(".cart-dropdown .custom-button").should(
      "have.css",
      "background-color",
      blackColor
    );

    cy.get(".cart-dropdown .custom-button")
      .realHover()
      .should("have.css", "background-color", whiteColor);
  });
});
