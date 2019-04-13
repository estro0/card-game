const CONSTANTS = {
	MAX_FACED_UP_CARDS: 2
};
const domHelper = domHelperFactory();
const gameModel= {
	flippedUpCards: [],
	triesCount: 0,
	flipDownCardTimeout: null,
	gameTable: []
};

function compareCards() {
	if (domHelper.getCardValue(gameModel.flippedUpCards[0]) === domHelper.getCardValue(gameModel.flippedUpCards[1])) {
		domHelper.displayResult('MATCH');
		gameModel.flippedUpCards = [];
	} else {
		domHelper.displayResult('NO MATCH');
		gameModel.flipDownCardTimeout = window.setTimeout(flipDownCard, 2000);
	}
}

function flipDownCard() {
	gameModel.triesCount += 1;
	domHelper.flipDownCard(gameModel.flippedUpCards);
	gameModel.flippedUpCards = [];
	domHelper.displayResult('--');
	domHelper.displayTriesCount(gameModel.triesCount);
}

function flipUpCard(eventTarget) {
	const cardAlredyFlippedUp = gameModel.flippedUpCards.indexOf(eventTarget) > -1;
	
	if (cardAlredyFlippedUp) {
		console.log('cardAlredyFlippedUp');
	} else if (gameModel.flippedUpCards.length < CONSTANTS.MAX_FACED_UP_CARDS) {
		eventTarget.innerText = eventTarget.getAttribute('data-card-value');
		gameModel.flippedUpCards.push(eventTarget);
	}
	
	if (gameModel.flippedUpCards.length === CONSTANTS.MAX_FACED_UP_CARDS) {
		compareCards();
	}
}

function resetGameState() {
	window.clearTimeout(gameModel.flipDownCardTimeout);
	gameModel.triesCount = 0;
	domHelper.displayTriesCount(gameModel.triesCount);
	gameModel.flippedUpCards = [];
	gameModel.gameTable = [];
	
	domHelper.resetTable();
}

function getRandomNumber (from = 1, to = 100) {
	return Math.floor((Math.random() * to) + from);
}

function startGame() {
	resetGameState();
	
	const numberOfCard = domHelper.getSelectedNumberOfCard();
	const cardValues = [];
	
	for (let i = 0; i < numberOfCard; i++) {
		const generatedCardValue = getRandomNumber();
		cardValues.push(generatedCardValue);
		cardValues.push(generatedCardValue);
	}
	
	generateGameTable(cardValues, numberOfCard);
	domHelper.drawTable(gameModel.gameTable);
}

function generateGameTable(cardValues, numberOfCard, rowIndex = 0) {
	const oneRowLength = Math.floor(numberOfCard / 2);
	
	if (cardValues.length) {
		const cardValue = cardValues[getRandomNumber(0, cardValues.length - 1)];
		const cardValueIndex = cardValues.indexOf(cardValue);
		
		if (!gameModel.gameTable[rowIndex]) {
			gameModel.gameTable.push([]);
		}
		
		if (gameModel.gameTable[rowIndex].length != oneRowLength) {
			gameModel.gameTable[rowIndex].push([cardValue]);
		} else {
			gameModel.gameTable.push([]);
			gameModel.gameTable[rowIndex].push([cardValue]);
			rowIndex += 1;
		}
		
		cardValues.splice(cardValueIndex, 1);
		generateGameTable(cardValues, numberOfCard, rowIndex);
	}
}

function init() {
	startGame();
	domHelper.handleClickOnTable(flipUpCard);
	domHelper.handleClickOnRestartGameBtn(startGame);
}

window.onload = init;