@api
Feature: DummyJSON - Login API

  Scenario Outline: Login exitoso devuelve token
    When I login to DummyJSON with username "<username>" and password "<password>"
    Then the response status should be one of 200 or 201
    And the response should contain a token
    And the field "id" should be a number
    And the field "username" should be a string

    Examples:
      | username   | password     |
      | emilys     | emilyspass    |
      | michaelw   | michaelwpass  |
      | sophiab    | sophiabpass   |
