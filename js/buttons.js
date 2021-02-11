// create event listeners for the tooltips if they exist
function tooltipCreator(){
    let currentWizzTooltip;
    currentWizzTooltip = document.querySelector('.tooltip');
    currentWizzTooltip.addEventListener('mouseover', () =>{
        const popup = document.createElement('div');
        popup.setAttribute('class', 'popup')
        const tooltipTextP = document.createElement('p')
        const tooltipMessage = document.createTextNode(forms[currentFormNumber].tooltipMessage)
        tooltipTextP.appendChild(tooltipMessage)

        popup.appendChild(tooltipTextP)
        document.querySelector('.icsg-project-capsule').append(popup)
        var draw = SVG().addTo(popup).size('100%','100%').addClass('tooltip-holder')
        const offSetPopupHeight = popup.offsetHeight - 4
        const offsetPopupWidth = popup.offsetWidth - 4

        const tooltipPolygonPoints = [
            `2,25`,
            `2,${offSetPopupHeight}`,
            `${offsetPopupWidth},${offSetPopupHeight}`,
            `${offsetPopupWidth},25`,
            `${(offsetPopupWidth * .5) + 20},25`,
            `${offsetPopupWidth * .5},2`,
            `${(offsetPopupWidth * .5) - 20},25`,
        ].join(' ')

        var titleShape = draw.polygon(tooltipPolygonPoints)
        .attr({stroke: 'black', 'stroke-width': 1.5, 'stroke-alignment': 'center', fill: 'white'}).addClass('zindex')

        // renders the tool tip and follows the mouse
        function renderTooltip(a) {
            var mouseX = a.clientX + 10 + 'px';
            var mouseY = a.clientY + 10 + 'px';
            popup.style.top = mouseY
            popup.style.left = mouseX
        }

        document.addEventListener('mousemove', renderTooltip)
        
        // on mouse out remove the popup
        currentWizzTooltip.addEventListener('mouseout', () =>{
            document.removeEventListener('mousemove', renderTooltip)
            popup.remove()
        })
    })
}

function MainButton() {

    let errorExists = false;
    let errorMessage;
    let currentAnswerInfo = {};

    if(userData.length > currentFormNumber){
        userData[currentFormNumber] = currentAnswerInfo;
    } else {
        userData.push(currentAnswerInfo);
    }
 
    const $inputList = document.getElementsByTagName('input');
    l = $inputList.length;
    const Verification = document.querySelector('#wizz_' + currentFormNumber).func;

    if(Verification){    
        errorMessage = Verification($inputList);
        if(errorMessage != ''){
            errorExists = true;
            const $items = document.querySelector('.items').lastElementChild;
            const errorContainer = document.createElement('p');
            errorContainer.classList.add('error');
            const existingError = document.querySelector('.error');
            if(existingError){
                existingError.innerHTML = errorMessage;
            } else {
                $items.parentNode.insertBefore(errorContainer, $items.nextElementSibling)
                errorContainer.innerHTML = errorMessage;
            }  
        }
    }
 
    currentAnswerInfo.form = forms[currentFormNumber]; //// adds the question object to the userdata for reference later

    for (i = 0; i < l; i++) {

        const inputID = ($inputList[i].getAttribute('id'));
        const formName = ($inputList[i].getAttribute('name'))
        const userInput = ($inputList[i].value);
        let verifyFunction = verifyLookUp[inputID];


        if($inputList[i].type === 'radio'){
            if($inputList[i].checked){
                currentAnswerInfo.value = userInput;
            }




        } else if ($inputList[i].type === 'text') {
            if (!currentAnswerInfo.value){
                currentAnswerInfo.value = {};
            }
            currentAnswerInfo.value[inputID] = userInput
            errorMessage = verifyFunction(userInput);
    
            if(errorMessage != ""){
               $inputList[i].parentNode.lastChild.innerHTML = errorMessage;
               errorExists = true;
            } else {
               $inputList[i].parentNode.lastChild.innerHTML = "";
            }



        } else if ($inputList[i].type === 'checkbox') { 

            if (!currentAnswerInfo.value){
                currentAnswerInfo.value = [];
            }

            if($inputList[i].checked){
                currentAnswerInfo.value.push(inputID)
            }
        }
 
    }


    if(errorExists){
        return
    } else {
        answerHandler(currentAnswerInfo)

        currentFormNumber ++;
        if(currentFormNumber === forms.length){    
            console.log(userData)
            console.log(currentWeights);
            terminateQuiz()
            return;
        }


        const $wizzHolder = document.querySelector('.wizz-holder');
        this.classList.add('button-inactive');
        $wizzHolder.style.minWidth = '200vw';
        $wizzHolder.style.transition = `transform ${transitionTime}s ease-in`;
        buildScreen();
        $wizzHolder.style.transform = 'translateX(-100vw)';

        function wizzReset() {
            const $previousWizz = document.querySelector('#wizz_' + (currentFormNumber - 1));
            $wizzHolder.style.transition = 'none';
            $previousWizz.remove();
            $wizzHolder.style.minWidth = '100vw';
            $wizzHolder.style.transform = 'translateX(0vw)';
            transitionEvent && $wizzHolder.removeEventListener(transitionEvent, wizzReset);
            console.log('reset!!')
            
            //if a tooltip message exists build the tooltip listeners on the press of "next"
            if(forms[currentFormNumber].tooltipMessage){
                tooltipCreator()
            } 

        }

        transitionEvent && $wizzHolder.addEventListener(transitionEvent, wizzReset);




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