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
			src: tile.src,
			alt: 'image of tile ' + tile.tileNum
		});
		img.data('tile', tile);
		row.append(img);
	});


});