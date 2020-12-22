//?                                  THE QUIZ MASTER                                        

// const currentWeights = 
// {
// 	bariatric: .5,
// 	pediatric: .5,
// 	transport: .5,
// 	rehab: .5,
// 	pedal: .5,
// 	positioning: .5,
// 	glider: .5,
// 	hygiene: .5,
// 	rocking: .5,
// 	removableArm: .5,
// }

const currentWeights = {
	vanguard: .5,
	reviveBariatric: .5,
	aspire: .5,
	tranquille: .5,
	encorePedal: .5,
	sashayPedal: .25,
	latitudePedal: .5,
	elitePositioning: .25,
	synthesisPositioning: .5,
	midlinePositioning: .5,
	eliteTilt: .25,
	centricPositioning: .5,
	latitudeRehab: .5,
	eliteRehab: .25,
	comfortRehab: .5,
	encoreRehab: .5,
	synthesisRehab: .5,
	revive: .5,
	synthesisTransport: .5,
	eliteTransport: .25,
	encorePedalWithTransport: .5,
	encorePedalWithRocking: .5,
	encoreRehabWithRocking: .5,
	latitudeWithRocking: .5,
}

const categories = {
	bariatric: ['vanguard', 'reviveBariatric'],
	glider: ['aspire', 'tranquille'],
	// package: ['additionalPositioningPadding', 'acuteCareConfiguration', 'huntingtonsSpecialPadding', 'slimPosturePadding'],
	pedal: ['encorePedal', 'sashayPedal', 'latitudePedal'],
	gsaCanadaOnly: ['elitePositioning'],
	positioning: ['synthesisPositioning', 'midlinePositioning', 'eliteTilt', 'centricPositioning'],
	rehab: ['latitudeRehab', 'eliteRehab', 'comfortRehab', 'encoreRehab', 'synthesisRehab'],
	hygiene: ['revive'],
	transport: ['synthesisTransport', 'eliteTransport', 'encorePedalWithTransport'],
	lowWeight: ['latitudePedal', 'encoreRehab', 'latitudeRehab', 'centricPositioning'],
	rocking: ['encorePedalWithRocking', 'encoreRehabWithRocking', 'latitudeWithRocking']
}


function answerHandler(currentAnswerInfo) {
	const answer = currentAnswerInfo.value;
	
	const nextState = currentAnswerInfo.form.onAnswer(answer)
	if(nextState){
		forms.push(nextState)
	}
}

function setCategory(category, value){
	categories[category].forEach(chair => {
		if(currentWeights[chair] > 0){
			if(currentWeights[chair] < 1){
				currentWeights[chair] = value
			}
		}
	})
}

function setAllExcept(exemption, value) {
	Object.keys(categories).filter(category => category !== exemption).forEach(category => setCategory(category, value))
}

function addCategory(category, value){
	categories[category].forEach(chair => {
		if(currentWeights[chair] > 0){
			if(currentWeights[chair] < 1){
				currentWeights[chair] = clamp(0.01, .99, currentWeights[chair] + value)
			}
		}
	})
}

function setChair(chair, value){
	if(currentWeights[chair] > 0){
		if(currentWeights[chair] < 1){
			currentWeights[chair] = value
		}
	}
}

function addChair(chair, value){
	if(currentWeights[chair] > 0){
		if(currentWeights[chair] < 1){
			currentWeights[chair] = clamp(.01, .99, currentWeights[chair] + value)
		}
	}
}