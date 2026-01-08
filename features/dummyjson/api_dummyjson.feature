@api
Feature: DummyJSON - API Tests

  Scenario Outline: Login API - Validar token para 3 usuarios
    When I login to DummyJSON with username "<username>" and password "<password>"
    Then the response status should be 200
    And the response should contain a token

    Examples:
      | username   | password     |
      | emilys     | emilyspass    |
      | michaelw   | michaelwpass  |
      | sophiab    | sophiabpass   |

  Scenario: Flujo API - List users -> Login -> Consultar usuario logueado
    When I request the users list
    Then the response status should be 200
    And the response should have a users array

    When I login to DummyJSON with username "emilys" and password "emilyspass"
    Then the response status should be 200
    And the response should contain a token

    When I request the current user profile with the token
    Then the response status should be 200
    And the response should have the field "id"
