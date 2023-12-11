/// <reference types="cypress" />

import LoginPage from "../../pages/login";
import InventoryPage from "../../pages/inventory";
import CheckoutPage from "../../pages/checkout";
const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const checkoutPage = new CheckoutPage()

describe("sauce demo login tests", () => {

    // TC1- Check that a valid (standard_user) user can log-in with the valid credentials.

    it ("verifies that a user is able to login with valid creds", () => {
        loginPage.login("standard_user", "secret_sauce");
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');
        inventoryPage.logoutLinkVisible();
    });

    // TC2 - Check that a valid (standard_user) user can log-out.
    it ("verifies that a user can logout", () => {
        loginPage.login("standard_user", "secret_sauce");
        inventoryPage.clickLogutButton();
        cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html');
    });

    // TC3 - Check that a valid (standard_user) user cannot log-in with the invalid credentials.
    it ("verifies that a user is not able to login with incorrect credentials", () => {
        loginPage.login("user", "password");
        loginPage.errorMessage().should("have.text","Epic sadface: Username and password do not match any user in this service");
      });

    // TC4 - Check that locked-out user cannot log-in with the valid credentials.
    it ("verifies that a locked out user cannot login with valid credentials", () => {
        loginPage.login("user_locked", "password");
        loginPage.errorMessage().should("have.text","Epic sadface: Sorry, this user has been locked out.");
      });

    //TC5 - Check that a valid (performance_glitch_user) user can log-in with the valid credentials, but with long timeout.
    it ("verifies that a valid (performance_glitch_user) user can log-in with the valid credentials, but with long timeout", () => {
        loginPage.login("performance_glitch_user", "secret_sauce");
        cy.wait(10000);
        cy.url().should('include', '/inventory.html');
        inventoryPage.logoutLinkVisible();
      });

    //TC6 - Check that a valid user can add any item from the items list to the cart.
      it ("verifies that a user can add any item from the items list to the cart", () => {
        loginPage.login("standard_user", "secret_sauce");
        inventoryPage.addItemToShoppingCart('Sauce Labs Onesie');
        inventoryPage.clickShoppingCartIcon();
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Onesie');
        cy.get('.inventory_item_price').should('contain', '7.99');
        cy.get('.btn_action.checkout_button').should('be.visible');

      });

      //TC7 - Check that a valid user can buy any item from the items list.
      it ("verifies that a user can buy any item from the items list.", () => {
        // User login
        loginPage.login("standard_user", "secret_sauce");
        // Add item to shopping cart and verify Item Name and Item Price
        inventoryPage.addItemToShoppingCart('Sauce Labs Onesie');
        inventoryPage.clickShoppingCartIcon();
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Onesie');
        cy.get('.inventory_item_price').should('contain', '7.99');
        // Proceed to checkout
        cy.get('.btn_action.checkout_button').click();
        checkoutPage.checkout("nat", "pet", 1000);
        checkoutPage.clickFinishButton();
        // Verify successful purchase
        checkoutPage.successMessage('THANK YOU FOR YOUR ORDER');
      });

      //TC8 - Check that a valid user can login when screen width is less than 1060px
      it ("verifies that a valid user can login when screen width is less than 1060px", () => {
        loginPage.visit()
        cy.viewport(1050, 600);
        // Assert that the viewport width is set as expected
        cy.window().then((win) => {
          expect(win.innerWidth).to.eq(1050);
        });
        loginPage.fillUsername("standard_user");
        loginPage.fillPassword("secret_sauce");
        loginPage.clickLoginButton();
        cy.url().should('include', '/inventory.html');
        inventoryPage.logoutLinkVisible();
    });

});