/*
**Problem**
Implement a function that retrieves all the schedules that are available. 
If one or more schedules are available, tally the count of schedules for each staff 
and alert the user of result as "key: value" pairs with the staff id as key 
(in the format of 'staff {id}'; e.g, 'staff 1') and the count of schedules as the value. 

If there are no schedules, alert the user that there are currently no schedules available for booking.

When implementing the function, keep in mind that server has been known to slow down when there are more than 7 schedules 
to retrieve. It doesn't always happen, but be sure to handle it accordingly. 
Once 5 seconds have passed, cancel the retrieval and inform the user to try again.

Finally, inform the user about the completion of the request regardless of the success or failure (timeout) of the request.

Understanding the Problem

- input:
  - n/a

- output:
  - on success
    - object [{staff id#: # of schedules},  {staff id#: # of schedules}]
    - or alrert (no shcedules available for booking)
  - on timeout
    - inform user to try again
  - inform user of request completion
- model of problem:

**Examples / Test Cases**


**Data Structures**


**Algorithm**
*/
