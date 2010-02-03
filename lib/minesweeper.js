
function Minesweeper(container_id,lin,col,mines){
	
	this.mines = mines;
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
	open: function(){
		
	},
	
	bum: function() {
		if (this.mines == 0) {
			return false;
		} else {
			return true;			
		}
	},
	win: function() {
		return true;
	}
}