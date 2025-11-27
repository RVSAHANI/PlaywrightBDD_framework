Feature: Playwright BDD with Cucumber

  Scenario: Open Playwright website
    Given I visit the Playwright homepage
    Then I should see the Playwright title
