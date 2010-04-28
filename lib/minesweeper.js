
function Minesweeper(container_id,lin,col){

	this.cells = [];
	for(var i=0 ; i<lin ; i++){
		var line_cells = [];
		this.cells.push(line_cells);
		for(var j=0 ; j<col ; j++){
			line_cells.push({isMine: false, isOpen:false});
		}
	}

	this.cellNumber = lin*col;
	this.opened = 0;
	this.blown = false;
	this.mines = 0;

	this.draw_board(container_id, lin, col);

}


Minesweeper.prototype = {

	open: function(lin,col){
	        //console.log(lin+','+col);
	        this.opened++;

	        this.cells[lin][col].isOpen=true;
	        if (this.cells[lin][col].isMine) {
		        this.blown = true;
		        this.cells[lin][col].td.text('*');
		        return '*';
	        }

            var neighbor_count = this.neighborCount(lin, col);
			
			this.open_chain(neighbor_count,lin,col);
			
			this.cells[lin][col].td.text(neighbor_count);
            return neighbor_count;
	},

	open_chain: function(neighbor_count, lin, col){
		if (neighbor_count==0) {
			var i,j;
            for(i=-1 ; i<2; i++){
		        for(j=-1 ; j<2; j++){
					// exceto ele mesmo
		            if (i != 0 || j !=0){
		                if (this.is_valid_coordinates(lin+i,col+j) &&
		                    !this.is_opened(lin+i,col+j)){
			                this.open(lin+i,col+j);
			            }
			        }
		        }
	        }
    	}
	},

	neighborCount: function(lin, col){
		var neighbors = 0;
		var i,j;

		for(i=-1 ; i<2; i++){
			for(j=-1 ; j<2; j++){
				if (this.hasMine(lin+i,col+j)){
					neighbors++;
				}
			}
		}

		return neighbors;
	},

	hasMine: function(lin, col) {
		return this.cells[lin] && this.cells[lin][col] && this.cells[lin][col].isMine;
	},

	hasExploded: function() {
		return this.blown;
	},

	win: function() {
		return this.opened == this.cellNumber - this.mines
				&& ! this.hasExploded();
	},

	draw_board: function(container_id, lin, col) {
		container = $('#' + container_id);

		var table = $('<table></table>');
		container.append(table);

		for(var i=0 ; i<lin ; i++){

			var tr = $("<tr></tr>");
			table.append(tr);

			for(var j=0 ; j<col ; j++){
				var td = $('<td></td>').data('cell', {line: i, column: j});
				this.cells[i][j].td = td;
				tr.append(td);
			}
		}

		_this = this;
		container.find('td').click(function(){
			var cell= $(this).data('cell');
			_this.open(cell.line, cell.column); 
		});
	},

	random_install_mines: function(numMines){
		for(i=0; i<numMines; i++) {
			do {
				var lin = Math.floor(Math.random()*this.cells.length);
				var col = Math.floor(Math.random()*this.cells[0].length);
			}while (this.cells[lin][col].isMine);

		    this.install_mine(lin,col);
		}
	},

	install_mine: function(lin, col){
		if (!this.is_valid_coordinates(lin,col)) {
			throw "mine out of bounds"
		}
		if(!this.cells[lin][col].isMine){
			this.mines++;
			this.cells[lin][col].isMine = true;
		}
	},

	is_valid_coordinates: function(lin, col) {
		return !(lin<0 || col<0
				|| lin>=this.cells.length
		    	||col>=this.cells[0].length)
	},

	is_opened: function(lin, col) {
        return this.cells[lin][col].isOpen;
	}
}

