<link rel="stylesheet" type="text/css" href="style.css">


Capture a string delimited by spaces

Form an array of all the strings from the page

Questions to ask:
Does the string has numbers?
    Yes: Does it have three numbers?
            Yes: Is the next string BC?
                Yes: Add to BCstrings array
                No: Is the next string AD?
                    Yes: Add to ADstrings array
                    No: Add to ThreeDigits array (maybe a year, but maybe not, how to do further tests?)
    Yes: Does it have four numbers?
            Yes: Is the next string BC?
                Yes: Add to BCstrings array
                No: Is the next string AD?
                    Yes: Add to ADstrings array
                    No: Add to FourDigits array (maybe a year, but maybe not, how to do further tests? limits between 1000 and 2100?)



How the years beteen 1000-2017 might appear on wikipedia
4 digits between spaces     - e.g. 1755
4 digits with a sign after  - e.g. 1819)  or  1783.  or  1783[
4 digit with a sign before  - e.g. (1755
4 digits dash 4 digits      - e.g. 1790-1801
4 digits dash 2 digits      - e.g. 1783-90



((?!([–|-|\\s:|p+.\\s])).|^) - fake-lookbehind, working but also takes the \s into the match
((?!([–|\/])).|^) - false-lookbehind for / for 355/367 BC mostly - issues here
[^\/|–|-] - false lookbehind - takes the /s and /n
