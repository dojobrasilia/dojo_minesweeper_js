
function Minesweeper(container_id,lin,col,mines){
	
	this.board = [];
	for(var i=0 ; i<lin ; i++){
		var line = []
		this.board.push(line)
		for(var j=0 ; j<col ; j++){
			line.push(false)
		}
		
	}
	this.opened = false;
	this.blown = false;
	
	for (var i=0 ; i<mines ; i++) {
		this.install_mine(0,0);	
	}

	this.draw_board(container_id, lin, col);
	
}


Minesweeper.prototype = {
	install_mine: function(lin, col){
		this.board[lin][col] = true;
	},
	
	open: function(lin,col){
		this.opened = true;
		if (this.board[lin][col]) {
			this.blown = true;
		}
	},
	
	hasExploded: function() {
		return this.blown;
	},
	
	win: function() {
		return this.opened && ! this.hasExploded();
	},
	
	draw_board: function(container_id, lin, col) {
		container = $('#' + container_id);

		var table = $('<table></table>');
		container.append(table);

		for(var i=0 ; i<lin ; i++){

			var tr = $("<tr></tr>")
			table.append(tr);

			for(var j=0 ; j<col ; j++){
				tr.append('<td></td>')
			}

		}
	},
}