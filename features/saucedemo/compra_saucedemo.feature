Feature: SauceDemo - Flujo de compra (E2E)

  Background:
    Given I open SauceDemo

  @e2e @happy
  Scenario: Camino feliz - Comprar un producto
    When I login with valid credentials
    And I add product "Sauce Labs Backpack" to the cart
    And I checkout with first name "Marco" last name "Molina" postal code "01000"
    Then I should see the order complete page

  @e2e @negative
  Scenario: Negativo - Login fallido
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error containing "Epic sadface"

  @e2e @smoke
  Scenario: Escenario libre - Ordenar y agregar el primer producto
    When I login with valid credentials
    And I sort products by "Price (low to high)"
    And I add the first product to the cart
    Then the cart badge should be "1"
