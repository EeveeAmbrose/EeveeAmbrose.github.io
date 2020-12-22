////?                         just a shorter console log                                    


function log(thing){
    console.log(thing);
}




// //?                        Functions that creates SVGS in HTML                              

/* This function pulls an id from a structure at the top of the htlm that looks like this:
    
<svg xmlns="http://www.w3.org/2000/svg" style ="display: none;">

    <symbol id="back-bracket" viewBox="0 0 30.02 30.02">
        <path d="M22.735,23.43c1.43,1.686,1.224,4.209-0.46,5.64c-0.753,0.641-1.674,0.95-2.587,0.95c-1.136,0-2.261-0.479-3.052-1.41
        L7.286,17.6c-1.269-1.493-1.269-3.688,0-5.179l9.351-11.01c1.431-1.684,3.953-1.889,5.639-0.459c1.684,1.43,1.89,3.954,0.46,5.638
        l-7.152,8.42L22.735,23.43z" />
    </symbol>

</svg>

*/


function CreateSVG(id) {
    const $Svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $Svg.setAttribute('class', 'illustration')
    const $Use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    $Use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + id);
    $Svg.appendChild($Use);
    return $Svg;
}




// //?                               Generates the HTML                                          

/*
    [
        {
            tag: 'div',
            attribute: 'class',
            attrValue: 'wizzbox',
            attributes: {
                type: 'text',
                name: items.formName
            },
            children: [
                {
                    tag: 'div',
                    attribute: 'class',
                    attrValue: 'wizz-head',
                    children: [
                        {
                            tag: 'h4',
                            text: 'Please enter your full name.',
                        },
                    ]    
                }
            ]
        },
    ]
*/


const key = 'tag';

const o = {tag: 'div'};



/**
 @typedef {string | {
    tag: string,
    class: string?,
    attributes: Object?,
    svg: string?,
    text: string?,
    children: [ElementStruct]?
    }} ElementStruct
 */

/** 
 * Generates HTML and returns.
* @param {[ElementStruct]} Elements - An array with keys for html elements 
* @returns {[HTMLElement]}
*/


function CreateHTML(Elements){

    return Elements.map(e => {

        let $Element;

        if (typeof e === 'string'){
            
            return e
        };
        if (e.svg !== undefined){
            
            $Element = CreateSVG(e.svg);
        } else {
            
            $Element = document.createElement(e.tag);
        };

        if (e.class !== undefined){
            $Element.setAttribute('class', e.class)
        };
        
        if (e.attributes !== undefined){
            const l = Object.getOwnPropertyNames(e.attributes);
            l.forEach(k => {
                $Element.setAttribute(k, e.attributes[k])
            });


        };

        if (e.id !== undefined){
            $Element.setAttribute('id', e.id)
        };

        if(e.required){
            
            $Element.required = true;
        };

        if (e.text !== undefined){
            
            $Element.innerHTML = e.text;
        }

        if (e.children !== undefined){
            
            $Element.append(...CreateHTML(e.children));
        };

        
        return $Element;
        
    })

}


// //?                        Function that creates a nav                              


let NavList = [
    {text: "Header Content", link: "#sec_10"},
];

const BuildNav = function (
) {

    const $body = document.querySelector(".icsg-project-capsule");           // Select the body element
    const $nav = document.createElement("nav");             // Creates the nav element
    const $navUL = document.createElement("ul");            // creates the ul element
    $nav.prepend($navUL);                                   // adds the UL to the nav element
    $body.prepend($nav);                                    // adds the Nav to the body element
    NavList.forEach(function (value, index) {               // runs one time for each of the elements in the navlist array
        let $li = document.createElement("li");             // creates the li element
        let $a = document.createElement("a");               // creates the anchor element
        $a.setAttribute("href", value.link);                // sets the href attribute to be the "link" entry from the navlist array
        $a.innerText = value.text;                          // sets the text for the anchor tag to be the "text" entry from the navlist array
        $li.append($a);                                     // adds the anchor element to the li
        $navUL.append($li);                                 // adds the li to the navUL
    });
}

BuildNav();


////?     Clamps  "ill clamp ya!"                               

function clamp(min, max, value){
    return Math.max(Math.min(value, max), min)
}




//?          console log table parser                     

// i would like to make this but itll take me to long right now


// //?                       magic                                      

function transitionEventEndName(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

var transitionEvent = transitionEventEndName();

/*
The above function allows you to detect when css animations are complete. just add:
transitionEvent && e.addEventListener(transitionEvent, function() {
	console.log('Transition complete!  This is the callback, no library needed!');
});


where "e" is the element that is transitioning

*/