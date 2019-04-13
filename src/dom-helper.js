function domHelperFactory() {
	function createCardRow() {
		const tableRowHtmlTag = document.createElement("div");
		const htmlTableRowRef = document.getElementsByClassName('table')[0].appendChild(tableRowHtmlTag);
		htmlTableRowRef.classList = 'row';
		
		return htmlTableRowRef;
	}
	
	function createCard(tableRowHtmlRef, cardValue) {
		const cardHtmlTag = document.createElement("div");
		const cardHtmlRef = tableRowHtmlRef.appendChild(cardHtmlTag);
		cardHtmlRef.classList = 'card';
		cardHtmlRef.setAttribute('data-card-value', cardValue);
	}
	
	function flipDownCard(flippedUpCards) {
		flippedUpCards.forEach(cardHtmlRef => {
			cardHtmlRef.innerText = '';
		});
	}
	
	function resetTable() {
		document.getElementsByClassName('table')[0].innerHTML = '';
	}
	
	function drawTable(table) {
		resetTable();
		
		table.forEach(row => {
			const tableRowHtmlRef = createCardRow();
			
			row.forEach(card => {
				createCard(tableRowHtmlRef, card);
			})
		});
	}
	
	function getCardValue(flippedUpCardsHtmlRef) {
		return flippedUpCardsHtmlRef.getAttribute('data-card-value');
	}
	
	function handleClickOnTable(callback) {
		document.getElementsByClassName('table')[0].addEventListener('click', event => {
			callback(event.target);
		});
	}
	
	function handleClickOnRestartGameBtn(callback) {
		document.getElementById('restartGameBtn').addEventListener('click', event => {
			callback(event.target);
		});
	}
	
	function displayResult(result) {
		document.getElementsByClassName('result')[0].innerText = result;
	}
	
	function displayTriesCount(triesCount) {
		document.getElementsByClassName('tries-count')[0].innerText = triesCount;
	}
	
	function getSelectedNumberOfCard(){
		const numberOfCardHtmlRef = document.getElementById("numberOfCard");
		return numberOfCardHtmlRef.options[numberOfCardHtmlRef.selectedIndex].value;
	}
	
	return {
		createCardRow: createCardRow,
		createCard: createCard,
		flipDownCard : flipDownCard,
		drawTable : drawTable,
		getCardValue: getCardValue,
		displayResult: displayResult,
		displayTriesCount: displayTriesCount,
		handleClickOnTable: handleClickOnTable,
		handleClickOnRestartGameBtn: handleClickOnRestartGameBtn,
		getSelectedNumberOfCard: getSelectedNumberOfCard,
		resetTable: resetTable
	}
}