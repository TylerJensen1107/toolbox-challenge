$(document).ready(function() {
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

	var images = $('#game-board img');

	var matches = 0;
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
				missed++;
				// if(tile.flipped) {
				// 	img.attr('src', 'img/tile-back.png');
				// } else {
					img.attr({
						src: tile.src
					});
				//}
				//tile.flipped = !tile.flipped;
				tile.canFlip = false;
				img.fadeIn(100);

				console.log(tileOne);
				console.log(tileTwo);

				//If we have chosen two tiles
				if(tileOne != null && tileTwo != null) {
					if(tileOne.tileNum == tileTwo.tileNum) {
						matches++;
						matchesLeft--;
					} else {
						//Because the code after set timeout runs before set timeout, all the variables are reset. To
						//Solve this I created copies
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
		$('#elapsed-seconds').text(elapsedSeconds);
		if(matches == 8) {
			window.clearInterval(timer);
		}
	}, 1000);

});