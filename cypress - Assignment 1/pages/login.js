export default class LoginPage{
  

    visit() {
        cy.visit("https://www.saucedemo.com/v1/")
    }

    fillUsername(username) {
        cy.get('[data-test="username"]').type(username);
    }

    fillPassword(password) {
        cy.get('input[type="password"]').type(password);
    }

    clickLoginButton() {
        cy.get("#login-button").click();
    }

    login(username, password) {
    this.visit()
    this.fillUsername(username)
    this.fillPassword(password)
    this.clickLoginButton()
    }

    errorMessage() {
        return cy.get('[data-test="error"]')
    }

}