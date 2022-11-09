Feature: Get courses
  As a user with permissions
  I want to get courses

  Scenario: All existing courses
    Given the following event is received:
    """
    {
      "data": {
        "id": "62d9536e487ee76ccf7f7a6e",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "bfd73ce7bacce0ca0adcabde",
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
    And the following event is received:
    """
        {
      "data": {
        "id": "fbb6c9f77d69f6d62f6d02c8",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "3c81f2ae6e445df779f5ce3e",
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
    And I send a GET request to "/courses"
    Then the response status code should be 200
    And the response should be:
    """
    [
      {
          "id": "bfd73ce7bacce0ca0adcabde",
          "name": "DDD en PHP!",
          "duration": "25 hours"
      },
      {
          "id": "3c81f2ae6e445df779f5ce3e",
          "name": "DDD en Java!",
          "duration": "24 hours"
      }
    ]
    """
