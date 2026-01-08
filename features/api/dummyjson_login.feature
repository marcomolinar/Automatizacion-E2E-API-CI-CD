@api
Feature: DummyJSON - Login API

  Scenario Outline: Login exitoso devuelve token
    When I login to DummyJSON with username "<username>" and password "<password>"
    Then the response status should be 200
    And the response should contain a token

    Examples:
      | username   | password     |
      | emilys     | emilyspass    |
      | michaelw   | michaelwpass  |
      | sophiab    | sophiabpass   |
