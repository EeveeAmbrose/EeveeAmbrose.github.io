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

        //Can i add my event listeners for the tooltips here?!

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