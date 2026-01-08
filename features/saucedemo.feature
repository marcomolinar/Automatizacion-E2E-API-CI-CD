Feature: SauceDemo - Compra E2E

  @e2e @happy
  Scenario: Camino feliz - comprar un producto
    Given I open SauceDemo
    When I login with valid credentials
    And I add the first product to the cart
    And I checkout with first name "Marco" last name "Molina" postal code "01000"
    Then I should see the order complete page

  @e2e @negative
  Scenario: Negativo - login fallido
    Given I open SauceDemo
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error containing "locked out"

  @e2e @extra
  Scenario: Extra - ordenar productos y agregar uno específico al carrito
    Given I open SauceDemo
    When I login with valid credentials
    And I sort products by "Price (low to high)"
    And I add product "Sauce Labs Onesie" to the cart
    Then the cart badge should be "1"
