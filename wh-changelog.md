02-08-2019

PowerPoint:
    Completed Google Slides presentation, fixed formatting in slides, beautified presentation. 
    Condensed presentation from 30 total slides to 12 to accommodate an 8 - 10 minute presentation time.
    Added hard copy of PowerPoint to GitHub file.
    Created editable share link for PowerPoint. 

-----------------------------------------------------------------------------------------------------------------------------------------------------------

02-07-2019

JavaScript:
    calls.js:
        Switched search type to search by keyword instead of by title to return entirety of results for movies that might have the same or similar names.
        Stored relevant imdbID data from search in data attribute for each movie poster.
CSS:
    main.css:
        Adjusted rendering of fav icon to be proportionate to rendered posters.

-----------------------------------------------------------------------------------------------------------------------------------------------------------

02-06-2019

PROJECT-1:
    Created wh-changelog.md to detail changes personally made by me, date said changes were made and approximate time pushed.

index.html:
    Cleaned index.html indentation and formatting for ease of reading. 
    Added comment notes for current sections in index.html to detail specific purpose for future references. 
    Fixed a couple of unclosed div tags.
    Correctly ordered script tags in head section; ie placed Firebase as script preceding all others, and modularized JavaScript application files to succeed others. 
    Applied defer attribute to relevant script tags to mimic posting at end of body.
    Established a container div with id 'renderResults' for search results to populate in pre-footer as the former div with class 'container' is now obsolete.

README.md:
    Listed technologies incorporated in project and added creditary links to resources used.
    Listed project members and added creditary links to GitHub profiles.

JavaScript:
    main.js:
        Modularized code; removed calls and responses from main.js JavaScript file - left all preceding code for handling authentication and Firebase untouched.
    calls.js:
        Changed scoping of declared variables to be within search-on-click function as declared variables are not used outside of search-on-click function.
        Created separate JavaScript calls.js file for modularized JavaScript code to allow easier interaction with code and easier reading of code.
        Modified calls to shorthand $.get from $.ajax as no pushing is being done with either GuideBox or OMDB; also to minimize total lines of code.
        Changed '.then' to '.done' to ensure all call data is received from GuideBox and OMDB before executing any HTML DOM manipulation.
        Changed call response variable names to distinguish which API the 'response' is from; GuideBox response is now 'gbResults', OMDB response is now 'omdbResponse'.
        Adjusted 'fav' variable to shorthand addition of class and attributes; changed source from URL to local storage.
        Updated event.preventDefault(); to prevent page refresh on search submission.
        Updated classes and id's within functions to correspond with current index.html; ie '#renderResults' id, '.searchbtn', '.searchShows' classes.
        Changed DOM manipulation to occur with information from OMDB AJAX call to minimize AJAX calls to GuideBox API due to the call limit.
        Set movie posters to render with class '.movie-image' for manipulation in CSS.

CSS:
    main.css:
        Set '.movie-image' class to render with: border: 2px solid transparent; border-radius: 4px; border-color: hsl(0, 0%, 5%); so images will be more visible against the background.

Images:
    Downloaded and added the 'fav' heart icon to local storage folder PROJECT-1/assets/images in the event the previously used direct link were to be altered or deleted.


