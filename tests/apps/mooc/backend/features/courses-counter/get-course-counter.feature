Feature: Obtain the total number of courses
  In order to have a courses counter
  As a user
  I want to see the courses counter

  Scenario: With one course
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "62d9536e487ee76ccf7f7a6e",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "62d9536e09897ed9fa89e490",
        "attributes": {
          "name": "DDD en PHP!",
          "duration": "25 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/courses-counter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 1
    }
    """


  Scenario: With more than one course having duplicates
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "62d9536e487ee76ccf7f7a6e",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "62d9536e09897ed9fa89e490",
        "attributes": {
          "name": "DDD en PHP!",
          "duration": "25 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And I send an event to the event bus:
    """
    {
      "data": {
        "id": "62d9536e487ee76ccf7f7a6f",
        "type": "course.created",
        "occurred_on": "2019-08-09T08:36:32+00:00",
        "aggregateId": "62d9536e487ee76ccf7f7a6f",
        "attributes": {
          "name": "DDD en Java!",
          "duration": "24 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And I send an event to the event bus:
    """
    {
      "data": {
        "id": "62d9536e487ee76ccf7f7a6f",
        "type": "course.created",
        "occurred_on": "2019-08-09T08:36:32+00:00",
        "aggregateId": "62d9536e487ee76ccf7f7a6f",
        "attributes": {
          "name": "DDD en Java!",
          "duration": "24 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/courses-counter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 2
    }
    """
