export default class CheckoutPage {

    fillFirstName(firstName) {
        cy.get('[data-test="firstName"]').type(firstName);
    }

    fillLastName(lastName) {
        cy.get('[data-test="lastName"]').type(lastName);
    }

    fillPostalCode(postalCode) {
        cy.get('[data-test="postalCode"]').type(postalCode);
    }

    clickContinueButton() {
        cy.get('.btn_primary').click();
    }

    clickFinishButton() {
        cy.contains('a.btn_action.cart_button', 'FINISH').click();
    }

    checkout(firstName, lastName, postalCode) {
        this.fillFirstName(firstName)
        this.fillLastName(lastName)
        this.fillPostalCode(postalCode)
        this.clickContinueButton()
        }

        successMessage() {
            return cy.get('h2.complete-header')
        }

}