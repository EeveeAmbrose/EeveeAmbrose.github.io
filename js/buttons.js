function tooltipCreator(){                                                                          //// creates the tooltips
    let currentWizzTooltip;                                                                         // initialize the currentWizzTooltip
    currentWizzTooltip = document.querySelector('.tooltip');                                        // Selects the tooltip element
    currentWizzTooltip.addEventListener('mouseover', () =>{                                         // create an event listener on the tooltip element for mouseover
        const popup = document.createElement('div');                                                // Creates the div element that will store the tooltip
        popup.setAttribute('class', 'popup')                                                        // gives the popup element a class for styling
        const tooltipTextP = document.createElement('p')                                            // creates the p element
        const tooltipMessage = document.createTextNode(forms[currentFormNumber].toltipMessage)      // creates a text node and puts the tooltip message from wizardstates into it
        tooltipTextP.appendChild(tooltipMessage)                                                    // appends the message above into to the the p element
        popup.append(tooltipTextP)                                                                  // appends the popup element with the p element
        document.querySelector('.icsg-project-capsule').append(popup)                               // selects the icsg project div and appends the popup to it.



        var draw = SVG().addTo(popup).size('100%','100%').addClass('tooltip-holder')            // creates an svg inside of the popup and gives it a class fopr styling
        const offSetPopupHeight = popup.offsetHeight - 4                                        // Creates an offset by a few pixels for height so that the outline of the svg (created later) doesnt clip the edge
        const offsetPopupWidth = popup.offsetWidth - 4                                          // Creates an offset by a few pixels for width so that the outline of the svg (created later) doesnt clip the edge
        const tooltipPolygonPoints = [                                                          // The polygon points for the popup visual element.
            `2,25`,                                                                             // first point of the polygon written as x,y in pixels, the top left most point of the rectangle.
            `2,${offSetPopupHeight}`,                                                           // second point of the polygon written as x,y in pixels, the bottom left most point of the rectangle.
            `${offsetPopupWidth},${offSetPopupHeight}`,                                         // Third point of the polygon written as x,y in pixels. The bottom right most point of the rectangle.
            `${offsetPopupWidth},25`,                                                           // Fourth point on the polygon written as x,y in pixels. the top right most point of the rectangle.
            `${(offsetPopupWidth * .5) + 20},25`,                                               // Fifth point on the polygon written as x,y in pixels. The right hand starting point on the base of the triangle.
            `${offsetPopupWidth * .5},2`,                                                       // sixth point on the polygon written as x,y in pixels. The apex of the triangle.
            `${(offsetPopupWidth * .5) - 20},25`,                                               // Seventh point on the polygon written as x,y in pixels. The left hand point on the base of the triangle.
        ].join(' ')                                                                             // This just joins all of the string templates above, this was done for the sake of the readability of the code.
        draw.polygon(tooltipPolygonPoints).attr({stroke: 'black', 'stroke-width': 1.5, 'stroke-alignment': 'center', fill: 'white'}).addClass('zindex') // Draws the above points and gives them some visual styles
        
        

        function renderTooltip(a) {                 //// Render the tool tip on screen. 'a' is the information from the event.
            var mouseX = a.clientX + 10 + 'px';     // a.clientX is the mouse position during the event, I added 10 pixels to offset the tooltip render position.
            var mouseY = a.clientY + 10 + 'px';     // a.clientY is the mouse position during the event, I added 10 pixels to offset the tooltip render position.
            popup.style.top = mouseY                // Set the style top of the visual popup element on mouse position
            popup.style.left = mouseX               // Set the style left of the visual popup element on mouse position
        }
        document.addEventListener('mousemove', renderTooltip)                   //// Event listener for when a user moves the mouse while still over the tooltip element, then calls the above function on each move.
        currentWizzTooltip.addEventListener('mouseout', () =>{                  //// Event listener for when user moves mouse out of the tooltip element that removes the mouse tracking listener from above
            document.removeEventListener('mousemove', renderTooltip)            // Removes the tooltip mouse tracking function from above
            popup.remove()                                                      // Unrenders the visual from the window as well as all the code generated above from the html
        })
    })
}





function MainButton() { //// runs on press of the 'next' button

    let errorExists = false;            // Initializes error state and sets to false
    let errorMessage;                   // Initiialize error message
    let currentAnswerInfo = {};         // Initialize an object that will store all the information about a question and its answer
                                        //* currentAnswerInfo consist of 2 things, 1. what form the data came from and the data from its state in wizzardstates.js, 2. the value of the users input

    if(userData.length > currentFormNumber){                    // check to see if userdata, is larger than the current form number. This is useful later for when a back button is implemented.
        userData[currentFormNumber] = currentAnswerInfo;        //? This is for a later feature, the back button. This sets the corresponding userdata array item with whatever the new answers are.
        //! This feature still needs to be added on
    } else {                                                    // If userdata is not longer than currentformnumber
        userData.push(currentAnswerInfo);                       // Puts currentAnswerInfo into userData.
    }
 
    const $inputList = document.getElementsByTagName('input');                          //Gets all of the inputs from the page
    const Verification = document.querySelector('#wizz_' + currentFormNumber).func;     //This grabs the verrification function that was earlier attached to it at creation

    if(Verification){                                                                           // if the state has a verrification key....
        errorMessage = Verification($inputList);                                                // run the verifiction function and asigns its return (if any) to an errorMessage
        if(errorMessage != ''){                                                                 // If an error exsists....
            errorExists = true;                                                                 // Sets a flag so that the wizz knows not to continue
            const $items = document.querySelector('.items').lastElementChild;                   // selects the last of the querries on the page
            const errorContainer = document.createElement('p');                                 // Creates a p element that will contain the error message
            errorContainer.classList.add('error');                                              // Adds the class 'error' to the p element for styling
            const existingError = document.querySelector('.error');                             // Selects any existing erros that may exist
            if(existingError){                                                                  // If an error already existed on 'next' button press...
                existingError.innerHTML = errorMessage;                                         // Set the p's text to read as whatever errormessage was given back by the verification function
            } else {                                                                            // If not error existed already on 'next' button press...
                $items.parentNode.insertBefore(errorContainer, $items.nextElementSibling)       // Insert the errorcontainer at the bottom of the element that caused the error
                errorContainer.innerHTML = errorMessage;                                        // Set the p's text to read as whatever errormessage was given back by the verification function
            }  
        }
    }
 
    currentAnswerInfo.form = forms[currentFormNumber]; //// adds the question object to the userdata for reference later

    l = $inputList.length;                                                          // gets the length of the inputs list (How many querries were on screen.)
    for (i = 0; i < l; i++) {                                                       //// For loop that runs until it has run on each field on screen

        const inputID = ($inputList[i].getAttribute('id'));                         // gets the ID of the input being itterated over
        const userInput = ($inputList[i].value);                                    // Gets the value of whatever the user selected from the current input being itterated over
        let verifyFunction = verifyLookUp[inputID];                                 // Looks up its verification function.
        //? Does this only apply to text boxes?
        //! Im thinking i can remove this using the new verification key in wizardstates. This seems to only apply to text inputs anyways, and if i can just write a veryifyText function that looks at what the ID of whatever input its itterating over and gets the veryification from that, then this will become useless and can be made a bit cleaner and will potentially solve me current bug with the new text fields (state, zip, canada province, etc)


        if($inputList[i].type === 'radio'){                                                 //// If the querie being itterated over a radio box...
            if($inputList[i].checked){                                                      // If the radio box is checked...
                currentAnswerInfo.value = userInput;                                        // Set its value as the value parameter in current answer info
            }
        } else if ($inputList[i].type === 'text') {                                         //// If the querie being itterated over is a text box...
            if (!currentAnswerInfo.value){                                                  // if this is the first text box in this series.
                currentAnswerInfo.value = {};                                               // initializes the 'value' key of currentanswerinfo as an object so that it can hold more than one key value pair
            }
            currentAnswerInfo.value[inputID] = userInput                                    // Initializes a key inside the object that was just made above and sets it to the inputsID, then sets its value to the users Input
            errorMessage = verifyFunction(userInput);                                       // Test if there is an error message via the verify function looked at above
            //! This may also be able to be removed when the verification is updated
    
            if(errorMessage != ""){                                                         //* if an error message exists...
               $inputList[i].parentNode.lastChild.innerHTML = errorMessage;                 // Selects the last child of the parent (the currently itterated text field) and sets its inner text to be the errormessage
               errorExists = true;                                                          // setting the error flag to true so that the Wizzard does not continue
            } else {                                                                        //* if no error message exists...
               $inputList[i].parentNode.lastChild.innerHTML = "";                           // Selects the last child of the parent (the currently itterated text field) and sets its inner text to be nothing (this is to remove error messages that may have existed before)
            }
        } else if ($inputList[i].type === 'checkbox') {                                     //// If the querie being itterated over is a checkbox...
            if (!currentAnswerInfo.value){                                                  // if this is the first checkbox being itterated over...
                currentAnswerInfo.value = [];                                               // initializes the 'value' key of currentanswerinfo as an array so that it can hold more than one value
            }

            if($inputList[i].checked){                                                      // if the currently itterated checkbox is checked...
                currentAnswerInfo.value.push(inputID)                                       // push it to the 'value' key
            }
        }
 
    }


    if(errorExists){                                                                        //// If there is an error...
        return                                                                              // Return and cancel continuation immediately
    } else {                                                                                //// If no error...
        answerHandler(currentAnswerInfo)                                                    // run answerHandler with the newly generated CurrentAnswerInfo

        currentFormNumber ++;                                                               // Itterate the currentFormNumber flag so that we can continue
        if(currentFormNumber === forms.length){                                             // if currentFormNumber is the same as the forms length, we have completed and no new forms exist. Terminate the quiz
            terminateQuiz()                                                                 // Terminates the quiz    
            return;                                                                         // escapes this function
        }


        const $wizzHolder = document.querySelector('.wizz-holder');                        // Grabs the wizzholder element
        this.classList.add('button-inactive');                                             // Sets the 'next' button  to be inactive and inoperable
        $wizzHolder.style.minWidth = '200vw';                                              // Sets the min width of the wizz holder to twice the users screen width (this helps with the transition)
        $wizzHolder.style.transition = `transform ${transitionTime}s ease-in`;             // sets the tranform property of wizzholder to ease in. (makes the animation a bit smoother and cleaner looking)
        buildScreen();                                                                     // Builds the next qizz
        $wizzHolder.style.transform = 'translateX(-100vw)';                                // Transition the new wizz on screen while pushing the old one away
        function wizzReset() {                                                                      //// Resets the wizz back to its original state
            const $previousWizz = document.querySelector('#wizz_' + (currentFormNumber - 1));       // Selects the previous wizzbox
            $previousWizz.remove();                                                                 // Removes the old wizz box
            $wizzHolder.style.transition = 'none';                                                  // Sets the wizzholder transtion back to none (so from now on all changes happen instantly instead of animating)
            $wizzHolder.style.minWidth = '100vw';                                                   // sets the wizzholder back to being equal of one users screen width
            $wizzHolder.style.transform = 'translateX(0vw)';                                        // snaps the wizzholder back to the furthest left point on users screen
            transitionEvent && $wizzHolder.removeEventListener(transitionEvent, wizzReset);         // Once all these animations complete, remove the event listener from the wizz holder
            
            if(forms[currentFormNumber].tooltipMessage){                    //if a tooltip message exists build the tooltip listeners on the press of "next"
                tooltipCreator()
            } 

        }

        transitionEvent && $wizzHolder.addEventListener(transitionEvent, wizzReset);                // Add an event listner for transitions onto wizz, that fires wizzreset when the animation completes
    }
};

function SelectUnits(o){                                                        
    const $cmButton = document.getElementById('cm-button');
    const $inchesButton = document.getElementById('inches-button');

    o.classList.add('button-selected');

    console.log(o.classList);
    if(o === $cmButton){
        $inchesButton.classList.remove('button-selected');
    } else {
        $cmButton.classList.remove('button-selected');
    }
};

// check for validity
// if valid {
    // load next question
    // flick it on screen while flicking old off screen
//}

//if not valid {Display error message}