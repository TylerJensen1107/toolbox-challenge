$(document).ready(function() {
	var tiles = [];
	for (var idx = 1; idx <= 32; idx++) {
		tiles.push({
			tileNum: idx,
			src: 'img/tile' + idx + '.jpg'
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
	images.click(function(){
		var img = $(this);
		var tile = img.data('tile');
		img.fadeOut(100, function() {
			if(tile.flipped) {
				img.attr('src', 'img/tile-back.png');
			} else {
				img.attr({
					src: tile.src
				});
			}
			tile.flipped = !tile.flipped;
			img.fadeIn(100);

		});
	});

	var startTime = _.now();
	var timer = window.setInterval(function() {
		var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
		$('#elapsed-seconds').text(elapsedSeconds);
		if(elapsedSeconds > 10) {
			window.clearInterval(timer);
		}
	}, 1000);

});