
function Minesweeper(container_id,lin,col,mines){
	
	this.mines = [];
	this.opened = false;
	this.blown = false;
	
	for (var i=0 ; i<mines ; i++) {
		this.install_mine(1,1);	
	}

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
	
}

Minesweeper.prototype = {
	install_mine: function(lin, col){
		this.mines.push([lin, col]);
	},
	
	open: function(lin,col){
		this.opened = true;
		for (var i=0 ; i<this.mines.length ; i++) {
			if (this.mines[i][0] == lin && this.mines[i][1] == col) {
				this.blown = true;
			}
		}
		
	},
	
	bum: function() {
		return this.blown;
	},
	
	win: function() {
		return this.opened;
	}
}