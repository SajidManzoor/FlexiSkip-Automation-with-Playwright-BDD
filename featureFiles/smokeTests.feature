@mode:serial
Feature: Smoke Tests

  Background:
    # Given the browser is launched
    Given a new page is created
    And the Excel file "data.xlsx" is read
    And the test data is extracted from "SmokeTests" sheet
    And the card details are extracted from "CardDetails" sheet

  Scenario: Login
    Given the user is on the login page
    When the user logs in with the email address and API key from the test data the user should be logged in successfully

  Scenario: Create Order
    Given the user selects the portal from the test data
    When the user clicks on eligibility
    And the user searches for the address from the test data
    And the user selects the first option
    And the user clicks on checkout
    And the user fills in the details from the test data
    And the user confirms the order
    And the user fills in the Stripe details from the card details the order should be created successfully

  Scenario: FAQ page
    Given the user opens the FAQ page
    Then the FAQ page should be validated successfully

  Scenario: Sign Out
    Given the user signs out
