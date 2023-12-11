export default class InventoryPage {

    visit() {
        cy.visit('https://www.saucedemo.com/v1/inventory.hmtl')
      }
  
    addItemToShoppingCart(inventoryItemName) {
        cy.get('div[class="inventory_list"] >div:has(a>div:contains('+ inventoryItemName +')) button').click();
        cy.get('div[class="inventory_list"] >div:has(a>div:contains('+ inventoryItemName +')) button').should("have.text", "REMOVE");
      }
  
    clickShoppingCartIcon(){
        cy.get('.fa-layers-counter').click()
      }

    // Open the sidebar
    openBurgerMenu() {
        cy.contains('Open Menu').click()
    }

    // Check if the logout link is present
    logoutLinkVisible() {
        cy.contains('Open Menu').click()
        cy.contains('Logout').should('be.visible')
    }

      // Logout
      clickLogutButton() {
        cy.contains('Open Menu').click()
        cy.contains('Logout').click();
    }
  
    }