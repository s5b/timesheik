timeshiek
=========

An AngularJS application for entering timesheet information. Based on the AngularJS seed infrastructure.

An experimental implementation of a spreadsheet-like timesheet in the browser. The fields are HTML5
content-editable in the upper part of the screen. The fields in the timesheet itself can be navigated
using the arrow keys, and incremented and decremented using the plus (+) and minus (-) keys, respectively.

The default starting date is the previous week for the timesheet.

It was built with manual testing in Google Chrome. It may have problems with Mozilla Firefox because of
disparities in the mapping of the key codes in the key event handlers. It has not been (designed for or)
tested on touch devices.

Running the Application
=======================

See the AngularJS README.md for more detailed instructions, but for the impatient:

1. Install node to serve the application.

2. Run this script from the command line: .scripts/web_server.js

3. Open http://localhost:8000/app/index.html


Testing
=======

There is considerable test coverage for some aspects of the application, and none for other aspects.
Again, look to the AngularJS README to see how to run the tests. (Although there is the beginning of
a grunt setup, the testing is not implemented through grunt, at present.)


Issues
======

1. May have issues in Mozilla Firefox.

2. Only been run on a Mac OS X - tried running it under Parallels but wouldn't work with Internet Exploder 8 (Windows XP)

3. Not tested on "touch"

3. Doesn't calculate the weekly total time properly when any of the "normal" subtotals are negative. In fact, it throws exceptions under the covers because the negative times can't be parsed ... oops.

4. There are no onscreen instructions on how to use the application. This should be done with a screen CSS, and separate print CSS.

4. Partially implemented grunt build.

5. Partially complete test coverage.

