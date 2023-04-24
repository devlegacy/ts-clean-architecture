Feature: Create a new course
  In order to have courses in the platform
  As an user with admin permissions
  I want to create a new course

  Scenario: A valid non existing course
    When I send a PUT request to "/courses/632fca4c28fd818a1049c75c" with body:
    """
    {
      "id": "632fca4c28fd818a1049c75c",
      "name": "The best course",
      "duration": "5 hours"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing course
    When I send a PUT request to "/courses/632fca4c28fd818a1049c75c" with body:
    """
    {
      "id": "632fca4c28fd818a1049c75c",
      "name": 5,
      "duration": "5 hours"
    }
    """
    Then the response status code should be 422
