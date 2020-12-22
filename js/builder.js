// //?                        Creates all the changing bits of the wizz.                              





function BuildTextInput(formName, idOfInput, required, labelText,) {

    return {
        tag: 'div',
        class: 'text-box',
        children: [
            
            {
                tag: 'input',
                required: required,
                attributes: {
                    formName: formName,
                    id: idOfInput,
                    autocomplete: 'off',
                },
            },
            {
                tag: 'label',
                class: 'text-input-animate',
                attributes: {
                    for: idOfInput,
                
                },
                children: [
                    {
                        tag: 'span',
                        class: 'text-label-actual',
                        text: labelText,
                    }
                ]
            },
            {
                tag: 'p',
                attributes: {
                    class: 'error'
                },
            }, 
        ]
    };
};


function BuildRadioInput(formName, idOfInput, labelText) {

    return {
        tag: 'div',
        class: 'radio-box',
        children: [
            {
                tag: 'input',
                attributes: {
                    type: 'radio',
                    name: formName,
                    id: idOfInput,
                    value: labelText,
                },
            },
            {
                tag: 'label',
                attributes: {
                    for: idOfInput,
                },
                children: [
                    {
                        tag: 'span',
                        class: 'radio-label-actual',
                        text: labelText
                    }
                ]
            },
            {
                tag: 'span',
                class: 'radio-circle'
            },
        ]
    }
}

function BuildCheckboxInput(formName, idOfInput, labelText){

    return {
        tag: 'div',
        class: 'check-box',
        children: [
            {
                tag: 'input',
                attributes: {
                    type: 'checkbox',
                    name: formName,
                    id: idOfInput,
                },
            },
            {
                tag: 'label',
                attributes: {
                    for: idOfInput,
                },
                children: [
                    {
                        tag: 'span',
                        class: 'checkbox-label-actual',
                        text: labelText
                    }
                ]
            },
            {
                tag: 'span',
                class: 'check-square'
            },
        ]
    }
}

function BuildMeasurementInput(formName, idOfInput, required, labelText, idOfSVG){

    return {
        tag: 'div',
        class: 'measurement',
        children: [
            {
                tag: 'div',
                class: ' m-top',
                children: [
                    BuildTextInput(formName, idOfInput, required, labelText),
                    {
                        tag: 'div',
                        class: 'units-button-container',
                        children: [
                            {
                                tag: 'a',
                                class: 'unit-button button-selected',
                                text: 'inches',
                                id: 'inches-button',
                                attributes:{
                                    onclick: 'SelectUnits(this);'
                                }
                            },
                            {
                                tag: 'a',
                                class: 'unit-button',
                                text: 'cm',
                                id: 'cm-button',
                                attributes:{
                                    href: '#',
                                    onclick: 'SelectUnits(this);'
                                }
                            },
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                class: 'm-bottom',
                children: [
                    {
                        svg: idOfSVG
                    }
                ]
            }
        ]
    }
}




function GenerateItems (items) {
    // console.log(items);
    return CreateHTML(items.map(item =>  { 
        
        if(item.type === 'text-box') {

            return BuildTextInput(item.formName, item.idOfInput, item.required, item.labelText);

        } else if (item.type ==='radio-box') {

            return BuildRadioInput(item.formName, item.idOfInput, item.labelText);

        } else if (item.type === 'measurement') {

            return BuildMeasurementInput(item.formName, item.idOfInput, item.required, item.labelText);
        } else if (item.type === 'check-box') {

            return BuildCheckboxInput(item.formName, item.idOfInput, item.labelText);
        };
    }))
};


function InsertQueries(queries) {
    const items = queries;
    const formName = forms[currentFormNumber].formName;
    items.forEach(i => i.formName = formName)
    const $Items = GenerateItems(items);
    const $Parent = document.querySelector('#wizz_' + currentFormNumber + ' .items');
    $Parent.append(...$Items);
}


// //? Build the wizz

function BuildWizz(question, tooltip, verification) {

    const $wizzHolder = document.querySelector('.wizz-holder');
    const WizzBoxStructure =
    [   
        {
            tag: 'section',
            attributes: {
                id: 'wizz_' + currentFormNumber,
                
            },
            children: [
                {
                    tag: 'div',
                    class: 'content-width',
                    children: [
                        {
                            tag: 'div',
                            class: 'stuff-wrap',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'wizzbox',
                                    children: [
                                        {
                                            tag: 'div',
                                            class: 'wizz-head',
                                            children: [
                                                {
                                                    tag: 'h4',
                                                    text: question,
                                                },
                                                {
                                                    tag: 'a',
                                                    class: 'tooltip',
                                                    text: tooltip, 
                                                }
                                            ]
                                        },
                                        {
                                            tag:'div',
                                            class: 'items', 
                                        },
                                        {
                                            tag:'div',
                                            class: 'wizz-foot',
                                            children: [
                                                {
                                                    tag: 'div',
                                                    class: 'wizz-foot-top',
                                                    children: [
                                                        {
                                                            tag: 'a',
                                                            class: 'main-button',
                                                            text: 'NEXT',
                                                            attributes: {
                                                                onclick: 'MainButton.call(this)'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    tag: 'div',
                                                    class: 'wizz-foot-bottom',
                                                    children: [
                                                        {
                                                            tag: 'div',
                                                            class: 'wizz-foot-botleft',
                                                            children: [
                                                                {
                                                                    tag: 'a',
                                                                    class: 'back-button',
                                                                    children: [
                                                                        {
                                                                            svg: 'back-bracket',
                                                                            class: 'arrow back-arrow'
                                                                        },
                                                                        "BACK"
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            tag: 'div',
                                                            class: 'wizz-foot-botright',
                                                            children: [
                                                                {
                                                                    tag: 'a',
                                                                    class: 'skip-button',
                                                                    attributes:{
                                                                        onclick: 'MainButton();'
                                                                    },     
                                                                    children: [
                                                                        "SKIP",
                                                                        {
                                                                            svg: 'back-bracket',
                                                                            class: 'arrow forward-arrow'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
  
    const $Stuff = CreateHTML(WizzBoxStructure);
    $Stuff[0].func = verification;
    $wizzHolder.append(...$Stuff);
  };





  //? Collect and build it all

  function buildScreen(){ //! would it be better to make this take a list of arguments instead of an array??
    const state = forms[currentFormNumber];
    BuildWizz(state.question, state.tooltip, state.verification);
    InsertQueries(state.queries);
    
    
  }