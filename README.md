# Website Performance Optimization Portfolio Project

In this project I took an existing website an optimized the critical rendering path to achieve a Pagespeed Insights score above 90.  I took the following steps to achieve this performance improvement:

* Utilized Grunt to automate:
  * Image minification
  * CSS and Javascript concatenation
  * CSS and Javascript minification
  * Running Pagespeed Insights Test

* Inlined critical CSS and used JavaScript to load the remaining CSS file after the page loads.
* Added the 'print' media query to the print.css file because it is only needed when the user wants to print the page, not at page load.
* Added 'async' tag to the Google Analytics file because it doesn't interact with the DOM and shouldn't block rendering.
* Used GIMP to resize images to reduce/eliminate the need to resize using CSS.

The pizza.html page has a background that moves when the user scrolls the page.  Initially this animation was very choppy, but I made some changes to achieve a smooth 60fps on scroll.

* I reduced the number of pizza images in the background.  The original code blindly created 200 pizzas no matter what, so many were off the screen and invisible to the user but still taking the computer's resources to move.  Now the program gets the screen size of the device and makes the correct number of pizzas based on that.
* To move the pizzas the original code changed the left style property of the pizza element.  This is inefficient because the browser needs to composite, paint, and layout the element every time it moves.  I used the translateX style to move the element instead because it only requires compositing (which is cheap).
* The original code had a scroll event listener and updated the position of the pizzas every time it detected a scroll.  This can be a problem because there can be multiple scroll events detected while the elements are currently updating or about to update.  This will cause the update function to run more times than necessary.  I modified the code so that the update function will only be called if an update isn't currently happening or about to happen.
  
### The Following Files Have Been Added or Modified to Improve Performance
* Gruntfile.js
* package.json
* index.html
* project-2048.html
* project-mobile.html
* project-webperf.html
* views/pizza.html
* css/style.css
* js/analytics.js
* js/loadCSS.js
* views/js/main.js
* views/css/style.css
* views/js/loadCSS.js
* All image files

(Note: all files in "build" folders are just combined and/or minified versions of the above modified files.)

### How to Test My Website's Performance

Go to [Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/) and enter in these urls:

* http://bahalps.github.io/frontend-nanodegree-mobile-portfolio/
* http://bahalps.github.io/frontend-nanodegree-mobile-portfolio/project-2048.html
* http://bahalps.github.io/frontend-nanodegree-mobile-portfolio/project-webperf.html
* http://bahalps.github.io/frontend-nanodegree-mobile-portfolio/project-mobile.html
* http://bahalps.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.html

