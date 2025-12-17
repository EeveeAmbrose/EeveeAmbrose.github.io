//?               A table that controls which function should be used to verify input      

const verifyLookUp = {
	'email-address': VerifyEmail,
	'first-name': VerifyAlphabetOnly,
	'last-name': VerifyAlphabetOnly,
	'usa-specific-location-state': VerifyAlphabetOnly,
	'usa-specific-location-city': VerifyAlphabetOnly,
	//'usa-specific-location-zip-code': VerifyNumbersOnly, //! This still needs to be made
	'canada-specific-location-province-territory': VerifyAlphabetOnly,
	'canada-specific-location-city': VerifyAlphabetOnly,
	//'canada-specific-location-postal-code': VerifyCanadaPostalCode, //! this still needs to be made!
}

//?                 START OF GENERAL CHECKS                    

function isBlank(userInput) {
	if(userInput === ""){
		return "Please fill out this field";
	}
};

function isNumber(userInput) {
	if (isNaN(parseInt(userInput))){
		return "";
	} else {
		return "This field should countain a number. Example: '124'";
	}
};

function ContainsNumber(userInput) {
	if (isNaN(parseInt(userInput))){
		return "";
	} else {
		return "This field should not contain any numbers.";
	};
};

function validateRadioForm(inputs) {

	const arr = Array.prototype.slice.call(inputs);
	if(arr.some(input => input.checked)) {
		return '';
	} else {
		return 'Please select an option above.'
	}
}

function validateCheckForm(inputs) {

	const arr = Array.prototype.slice.call(inputs);
	if(arr.some(input => input.checked)) {
		return '';
	} else {
		return 'Please select at least one option above.'
	}
}

function validateEmails(userInput) {

	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userInput))
	{
	  return '';
	} else {
		return 'Please provide a valid email address.'
	}
}



//?                  START OF SPECIFIC CHECKS                    



function verifySeatTopHead(userInput) {
	
	

	
}


function VerifyEmail(userInput) {

	const blankError = isBlank(userInput);
	if (blankError !== undefined) {
		return blankError;
	}

	const Emailerror = validateEmails(userInput);
	if (Emailerror !== undefined) {
		return Emailerror;
	}
};

function VerifyAlphabetOnly(userInput) {

	const blankError = isBlank(userInput);
	if (blankError !== undefined) {
		return blankError;
	}
	
	const containsNumberError = ContainsNumber(userInput);
	if (containsNumberError !== undefined) {
		return containsNumberError;
	}
};
