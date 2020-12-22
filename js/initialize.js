//* This file contains anything that handles the initial state of wizard

//! i need to burry everything into a unique id so that the sass doesnt eff anything on the main site up



//todo I can improve the animations all over the place with greensock
//todo 

// //?                        Launches the things I need at document ready.                              

var callback = function () {
  buildScreen();
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
};


//! todo:
/* //! THINGS YOU SHOULD ADD TO YOUR BOILERPLATE
CSS: Notations at the start of each line for colored comments
JS: The function that makes SVG

 */