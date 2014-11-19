var newGameCheck = true;

$(document).ready(function() {	
	//Readies the newGame button to start a new game. 
	$('#newGame').click(setup);
	setup();

});

function setup() {
	
	//On the first game, this will set newGameCheck to false. All subsequent games, it 
	//sets it to true. This is used to clear the timer on a new game.
	newGameCheck = !newGameCheck;

	//After 1.1 seconds, switch newGame to false. This ends the old timer but doesn't stop the new one.
	//This is perhaps the hackiest thing I've ever done.
	window.setTimeout(function() {
		newGameCheck = false;
	}, 1100);

	var tiles = [];
	for (var idx = 1; idx <= 32; idx++) {
		tiles.push({
			tileNum: idx,
			src: 'img/tile' + idx + '.jpg',
			canFlip: true
		});
	}

	var shuffled = _.shuffle(tiles);

	var chosen = shuffled.slice(0, 8);
	var tilePairs = [];
	_.forEach(chosen, function(tile) {
		tilePairs.push(_.clone(tile));
		tilePairs.push(_.clone(tile));
	});

	tilePairs = _.shuffle(tilePairs);

	var gameBoard = $('#game-board');
	gameBoard.empty();
	var row = $(document.createElement('div'));
	var img;
	_.forEach(tilePairs, function(tile, elemIndex) {
		if(elemIndex > 0 && 0 == elemIndex % 4) {
			gameBoard.append(row);
			row = $(document.createElement('div'));
		}
		img = $(document.createElement('img'));
		img.attr({
			src: 'img/tile-back.png',
			alt: 'image of tile ' + tile.tileNum
		});
		img.data('tile', tile);
		row.append(img);
	});

	gameBoard.append(row);

	play();
}

function play() {
	var images = $('#game-board img');

	var matches = 7;
	var matchesLeft = 8;
	var missed = 0;

	var tileOne;
	var tileTwo;
	var imgLast;

	images.click(function(){
		var img = $(this);
		var tile = img.data('tile');
		if(tile.canFlip) {
			img.fadeOut(100, function() {
				tileTwo = tileOne;
				tileOne = tile;
					img.attr({
						src: tile.src
					});
				tile.canFlip = false;
				img.fadeIn(100);

				//If we have chosen two tiles
				if(tileOne != null && tileTwo != null) {
					if(tileOne.tileNum == tileTwo.tileNum) {
						matches++;
						matchesLeft--;
					} else {
						//Because the code after set timeout runs before set timeout, all the variables are reset. To
						//Solve this I created copies
						missed++;
						var tileOneCopy = tileOne;
						var tileTwoCopy = tileTwo;
						var imgCopy = img;
						var imgLastCopy = imgLast;

						window.setTimeout(function() {
							tileOneCopy.canFlip = true;	
							tileTwoCopy.canFlip = true;
							imgCopy.attr('src', 'img/tile-back.png');
							imgLastCopy.attr('src', 'img/tile-back.png');
						}, 1000);
					}
					tileOne = null;
					tileTwo = null;
				}
				imgLast = img;
			});
		}
	});

	var startTime = _.now();
	var timer = window.setInterval(function() {
		var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
		$('#elapsed-seconds').text("Elapsed time : " + elapsedSeconds);
		$('#matches-made').text("Matches Made : " + matches);
		$('#wrong-guesses').text("Wrong Guesses : " + missed);
		$('#matches-left').text("Matches Left : " + matchesLeft);
		if(newGameCheck) {
			window.clearInterval(timer);
			newGameCheck = false;
		} else if (matches == 8) {
			newGameCheck = true;
			window.clearInterval(timer);
			alert('You win!!');
		};
	}, 1000);
}