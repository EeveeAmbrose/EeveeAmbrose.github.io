/* 
	const state = {
		question: '',
		tooltip: '',
		formName: '',
		verification: , //validateCheckForm, validateRadioForm
		queries:[
			
		]
	}
	// "verification" is only needed if the type is either checkform or radio form

	// if text-box:
	queries: [
		{
			type: 'text-box', 
			idOfInput: '',
			required: '',
			labelText: '',
			verifyID: ''
		}
	]

	// if radio-box
	queries: [
		{
			type: 'radio-box',
			idOfInput: '',
			labelText: '',
		}
	]

	// if check-box
	queries: [
		{
			type: 'check-box',
			idOfInput: '',
			labelText: '',
		}
	]

	// if measurement
	queries: [
		{
			type: 'measurement',
			idOfInput: '',
			required: '',
			labelText: '',
			idOfSVG: '#'
		}
	]
*/


const stateUserType = {
	question: 'Who are you getting a chair for?',
	tooltip: 'How do we use this information?',
	formName: 'user-type',
	verification:  validateRadioForm,
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'end-user',
			labelText: 'MYSELF',
		},
		{
			type: 'radio-box',
			idOfInput: 'family-member',
			labelText: 'FAMILY MEMBER',
		},
		{
			type: 'radio-box',
			idOfInput: 'dealer',
			labelText: 'CUSTOMER',
		},
		{
			type: 'radio-box',
			idOfInput: 'physician',
			labelText: 'PATIENT',
		}
	],
	onAnswer(){
		return stateUsersLocation
	}
}

const stateUsersLocation = {
	question: 'What is your general location?',
	tooltip: 'How do we use this information?',
	tooltipMessage: '',
	formName: 'general-location',
	verification: validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'usa',
			labelText: 'USA',
		},
		{
			type: 'radio-box',
			idOfInput: 'canada',
			labelText: 'CANADA',
		},
		{
			type: 'radio-box',
			idOfInput: 'australia',
			labelText: 'AUSTRALIA',
		},
		{
			type: 'radio-box',
			idOfInput: 'rest-of-world',
			labelText: 'REST OF WORLD',
		},
	],
	onAnswer(answer){
		if ( answer === 'USA') {
			setCategory('gsaCanadaOnly', 0)
			return stateUsaSpecificLocation
		} else if(answer === 'CANADA'){
			return stateCanadaSpecificLocation
		} else if (answer === 'AUSTRALIA') {
			setCategory('gsaCanadaOnly', 0)
			return stateBariatricRuleOut
		} else (answer === 'REST OF WORLD')
			setCategory('gsaCanadaOnly', 0)
			return stateBariatricRuleOut
	}
}

const stateUsaSpecificLocation = {
	question: 'Please provide your state, city, and zip code.',
	tooltip: 'How do we use this information?',
	formName: 'usa-specific-location',
	queries:[
		{
			type: 'text-box',
			idOfInput: 'usa-specific-location-state',
			required: 'true',
			labelText: 'STATE',
		},
		{
			type: 'text-box',
			idOfInput: 'usa-specific-location-city',
			required: 'true',
			labelText: 'CITY',
		},
		{
			type: 'text-box',
			idOfInput: 'usa-specific-location-zip-code',
			required: 'true',
			labelText: 'ZIP CODE',
		},
	],
	onAnswer(answer){
		return stateBariatricRuleOut
	}
}

const stateCanadaSpecificLocation = {
	question: 'Please provide your Province/Territory, City, and Postal Code.',
	tooltip: 'How do we use this information?',
	formName: 'canada-specific-location',
	queries:[
		{
			type: 'text-box',
			idOfInput: 'canada-specific-location-province-territory',
			required: 'true',
			labelText: 'PROVINCE/TERRITORY',
		},
		{
			type: 'text-box',
			idOfInput: 'canada-specific-location-city',
			required: 'true',
			labelText: 'CITY',
		},
		{
			type: 'text-box',
			idOfInput: 'canada-specific-location-postal-code',
			required: 'true',
			labelText: 'POSTAL CODE',
		},
	],
	onAnswer(answer){
		return stateBariatricRuleOut
	}
}

//?     Start chair category questions

const stateBariatricRuleOut = {
	question: 'Is the user of the chair at or over 600Lbs?',
	tooltip:  'How do we use this information?',
	formName: 'is-user-bariatric',
	verification: validateRadioForm,
	queries: [
		{
			type: 'radio-box',
			idOfInput: 'is-user-bariatric-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'is-user-bariatric-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setAllExcept('bariatric', 0)
			return stateBariatricDailyUse
		}
		//if no:
		setCategory('bariatric', 0)
		return stateGliderRuleOut
	}
}

const stateGliderRuleOut = {
	question: 'Does the user only need a stationary gliding chair?',
	formName: 'stationary-only',
	verification: validateRadioForm,
	queries: [
		{
			type: 'radio-box',
			idOfInput: 'stationary-only-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'stationary-only-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setAllExcept('glider', 0);
			return statePediatricRuleOut
		}
		//if no:
		setCategory('glider', 0)
		return stateTransportRuleOut
	}
}

const stateTransportRuleOut = {
	question: 'Will this user need to use this chair while in transport with a motor vehicle, van, or public transport?',
	formName: 'transport-only',
	verification: validateRadioForm,
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'transport-only-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'transport-only-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setAllExcept('transport', 0)
			return stateTransportSelfPropel
		}
		//if no:
		addCategory('transport', -.25)
		return stateHygeineRuleOut
	}
}

const stateTransportSelfPropel = {
	question: 'Is the user able to self-propel with hands and/or feet?',
	formName: 'transport-self-propel-possible',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'transport-self-propel-possible-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'transport-self-propel-possible-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setChair('encorePedal', 1)
			setChair('synthesisTransport', 0)
		}
		if(answer === 'NO'){
			setChair('synthesisTransport', 1)
			setChair('encorePedal', 0)
		}
		return stateName
	}
}

const stateHygeineRuleOut = {
	question: 'Does the chair only need to accommodate shower, bathing or commode needs?',
	formName: 'needs-hygeine',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'needs-hygeine-yes',
			labelText: 'YES'
		},
		{
			type: 'radio-box',
			idOfInput: 'needs-hygeine-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setCategory('hygiene', 1)
			return stateReviveDailyUse
		}
		//if no:
		setCategory('hygiene', 0)
		return stateLowWeight
	}
}

const stateLowWeight = {
	question: 'Is the user under 250lbs (113kg)?',
	formName: 'low-weight',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'low-weight-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'low-weight-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			addCategory('lowWeight', .2)
		}
		if(answer === 'NO'){
			setCategory('lowWeight', 0)
		}
		return stateSelfPropel
	}
}

const stateSelfPropel = {
	question: 'Is the user able to self-propel with hands and/or feet?',
	formName: 'self-propel-possible',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'self-propel-possible-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'self-propel-possible-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			addCategory('pedal', .2)
			return stateRockingFeature
		}
		if(answer === 'NO'){
			addCategory('pedal', -.2)
			return stateArmRemove
		}
	}
}

const stateArmRemove = {
	question: 'Does the user need removable armrests and lay flat recline?',
	tooltip: 'What are these features for?',
	formName: 'remove-arms-layflat',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'remove-arms-layflat-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'remove-arms-layflat-no',
			labelText: 'NO',
		}
	],
	onanswer(answer){
		if(answer === 'YES'){
			addChair('elitePositioning', .33)
			addChair('eliteTilt', .33)
			addChair('eliteRehab', .33)
			addChair('eliteTransport', .33)
			addChair('synthesisPositioning', .33)
			addChair('synthesisRehab', .33)
			addChair('synthesisTransport', .33)
		}
		if(answer === 'NO'){
			addChair('centricPositioning', .33)
			addChair('midlinePositioning', .33)
		}
		return stateName
	}
}

const stateBariatricDailyUse = {
	question: 'Does the user also need a chair for daily use?',
	formName: 'bariatric-daily-use',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'bariatric-daily-use-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'bariatric-daily-use-no',
			labelText: 'NO'
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			setChair('vanguard' ,1)
		 	setChair('reviveBariatric' ,1)
		}
		if(answer === 'NO'){
			setChair('reviveBariatric' ,0)
		}
		return stateName
	}
}

const stateReviveDailyUse = {
	question: 'Does the user also need a chair for daily use?',
	formName: 'revive-daily-use',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'revive-daily-use-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'revive-daily-use-no',
			labelText: 'NO'
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			return stateLowWeight
		}
		//if no:
		setAllExcept('hygiene', 0)
		return stateName
	}
}


const statePediatricRuleOut = {
	question: 'Is this for a child?',
	formName: 'pediatric',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'pediatric-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'pediatric-no',
			labelText: 'NO'
		}
	],
	onAnswer(answer){
		if(answer === 'NO'){
			setChair('aspire', 0)
		} else {
			//if yes:
			setChair('aspire', 1)
		}
		return stateName
	}
}

const stateRockingFeature = {
	question: 'Does the user have memory care or behavioral needs?',
	tooltip: 'What does "memory care" and "behavioral needs" refer to?',
	formName: 'rocking-feature',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'rocking-feature-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'rocking-feature-no',
			labelText: 'NO'
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			addChair('encorePedal', .2)
			addChair('encoreRehab', .2)
			addChair('latitudePedal', .2)
			addChair('latitudeRehab', .2)
			userData.needsRocking = true
			return stateRehabRuleOut
		}
		//if no:
		addChair('encorePedal', .2)
		addChair('encoreRehab', .2)
		addChair('sashayPedal', .2)
		userData.needsRocking = false
		return stateRehabRuleOut
	}	
}

const stateRehabRuleOut = {
	question: 'Does the user require a chair to accommodate and assist with a corrective or complex rehab program?',
	tooltip: 'What does this mean?',
	formName: 'needs-rehab',
	verification:  validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'needs-rehab-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'needs-rehab-no',
			labelText: 'NO'
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			addChair('encoreRehab', .2)
			addChair('latitudeRehab', .2)
		} else {
			//if no:
			addChair('sashayPedal', .2)
			addChair('encorePedal', .2)
			addChair('latitudePedal', .2)
			addChair('latitudeRehab', .2)
		}
		return stateName
		
	}
}


//? Ending personal questions
const stateName = {
	question: 'Please provide your name.',
	tooltip: 'How do we use this information?',
	tooltipMessage: 'Broda uses this information for a one time contact',
	formName: 'user-name',
	queries:[
		{
			type: 'text-box',
			idOfInput: 'first-name',
			required: 'true',
			labelText: 'FIRST NAME',
			// verifyID: 'test'
		},
		{
			type: 'text-box',
			idOfInput: 'last-name',
			required: 'true',
			labelText: 'LAST NAME',
			// verifyID: 'test'
		},
	],
	onAnswer(answer){
		return stateOneTimeContact
	}
}


const stateOneTimeContact = {
	question: 'Are you ok with a one time contact from a sales person regarding your results?',
	formName: 'one-time-contact',
	verification: validateRadioForm, //validateCheckForm, validateRadioForm
	queries:[
		{
			type: 'radio-box',
			idOfInput: 'contact-ok-yes',
			labelText: 'YES',
		},
		{
			type: 'radio-box',
			idOfInput: 'contact-ok-no',
			labelText: 'NO',
		}
	],
	onAnswer(answer){
		if(answer === 'YES'){
			return stateEmailAdress
		}
	}
}

const stateEmailAdress = {
	question: 'Please provide your email address.',
	tooltip: 'How do we use this information?',
	tooltipMessage: 'This is place holder text just to test that this feature is working. What if the line is really really realllllyyy longggggggg!?',
	formName: 'email-address',
	queries:[
		{
			type: 'text-box', 
			idOfInput: 'email-address',
			required: 'true',
			labelText: 'EMAIL ADDRESS',
			verifyID: 'VerifyEmail'
		}
	],
	// onAnswer(){
	// }
}



const forms = [
	// stateUserType,
	// stateUsersLocation,
	// stateUsaSpecificLocation,
	// stateCanadaSpecificLocation,
	
	//stateBariatricRuleOut,
	//stateGliderRuleOut,
	//stateTransportRuleOut,
	//stateHygeineRuleOut,
	//stateLowWeight,
	//stateSelfPropel,
	//stateArmRemove,
	//stateDailyUse,
	//statePediatricRuleOut,
	//stateRockingFeature,
	//stateRehabRuleOut

	stateName,
	//stateOneTimeContact,
	//stateEmailAdress,
]