document.addEventListener('DOMContentLoaded', function () {
	const NOT_FILLED = {val: 0, className: ""};
	const TIC = {val: 1, className: "tic"};
	const TAC = {val: 2, className: "tac"};
	const DRAW_RES = "draw";
	const SOMONE_WON_RES = "somoneWon";

	var cells = {
		l1c1: {el: document.getElementById("l1c1"), sign: NOT_FILLED.val}, 
		l1c2: {el: document.getElementById("l1c2"), sign: NOT_FILLED.val}, 
		l1c3: {el: document.getElementById("l1c3"), sign: NOT_FILLED.val},

		l2c1: {el: document.getElementById("l2c1"), sign: NOT_FILLED.val}, 
		l2c2: {el: document.getElementById("l2c2"), sign: NOT_FILLED.val}, 
		l2c3: {el: document.getElementById("l2c3"), sign: NOT_FILLED.val},

		l3c1: {el: document.getElementById("l3c1"), sign: NOT_FILLED.val}, 
		l3c2: {el: document.getElementById("l3c2"), sign: NOT_FILLED.val}, 
		l3c3: {el: document.getElementById("l3c3"), sign: NOT_FILLED.val}
	};

	const WINNINGS_POSITIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6]
	];

	// крестики: true, нолики: false
	var actor = true;

	var inGame = true;

	// add click listener 
	var gird = document.getElementById("Gird");
	gird.addEventListener("click", handleCellClick);


	function handleCellClick(e) {
		if (inGame) {
			handleAction(cells[e.target.id]);	
		}
	}

	function setActor(value) {
		var actorSpan = document.getElementById("actor");
		actor = value;
		if (actor) {
			actorSpan.innerHTML = "крестики";
		} else {
			actorSpan.innerHTML = "нолики";
		}
	}

	function handleAction(obj) {
		var element = obj.el;
		var value = !actor;
		if (element.className.indexOf(TIC.className) < 0 && element.className.indexOf(TAC.className) < 0) {
			setActor(value);
			var sign = value ? TIC : TAC; 
			element.className = element.className + " " + sign.className;
			obj.sign = sign;
			cells[obj.el.id] = obj;
		}
		var result = isEndOfGame(); 
		if (result) {
			inGame = false;
			if (result == DRAW_RES) {
				document.getElementById("message").innerHTML = "Игра окончена, ничья!";
			} else if (result == SOMONE_WON_RES) {
				document.getElementById("message").innerHTML = "Игра окончена! Победили " + (!actor ? "крестики" : "нолики");
			}	
		}
	}

	/*
		Игра закончена, когда зачеркнуто 3 клетки подряд 
		по горизонтали или вертикали или же по диагонали 
		всего 8 вариантов, поэтому их можно просто перечислить
		Индексы для массива cells перечислены в WINNINGS_POSITIONS
	*/

	function isEndOfGame() {
		var keys = Object.keys(cells);
		var somoneWon = false;

		//check winning positions
		WINNINGS_POSITIONS.forEach(function(part) {
			if ((cells[keys[part[0]]].sign == cells[keys[part[1]]].sign) 
					&& cells[keys[part[1]]].sign == cells[keys[part[2]]].sign) {
				if (cells[keys[part[0]]].sign != NOT_FILLED.val) {
					somoneWon = true; 
					return;
				}
			}
		});

		//check draw
		var filledCells = 0;
		keys.forEach(function(key) {
			var el = cells[key];
			if (el.sign != NOT_FILLED.val) {
				filledCells++;
			}
		});

		if (somoneWon) {
			return SOMONE_WON_RES;
		}

		if (filledCells == keys.length) {
			return DRAW_RES;
		}

		return false;
		
	}

});

