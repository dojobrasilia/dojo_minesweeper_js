
function Minesweeper(container_id,lin,col){

	this.board = [];
	for(var i=0 ; i<lin ; i++){
		var line = []
		this.board.push(line)
		for(var j=0 ; j<col ; j++){
			line.push(false)
		}

	}

	this.open_cells = [];
	for(var i=0 ; i<lin ; i++){
		var line = []
		this.open_cells.push(line)
		for(var j=0 ; j<col ; j++){
			line.push(false)
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
	        this.opened++;

	        this.open_cells[lin][col]=true;
	        if (this.board[lin][col]) {
		        this.blown = true;
		        return '*';
	        }

			// minas vizinhas
            neighbor_count = this.neighborCount(lin, col);
			
			//TODO: metodo
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

            return neighbor_count;
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
		return this.board[lin] && this.board[lin][col];
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
				tr.append(td);
			}
		}

		_this = this;
		container.find('td').click(function(){
			var cell= $(this).data('cell');
			var neighborCount = _this.open(cell.line, cell.column);
			 $(this).text(neighborCount);
		});
	},

	random_install_mines: function(numMines){
		for(i=0; i<numMines; i++) {
			do {
				var lin = Math.floor(Math.random()*this.board.length)
				var col = Math.floor(Math.random()*this.board[0].length)
			}while (this.board[lin][col]);

		    this.install_mine(lin,col);
		}
	},

	install_mine: function(lin, col){
		if (!this.is_valid_coordinates(lin,col)) {
			throw "mine out of bounds"
		}
		if(!this.board[lin][col]){
			this.mines++;
			this.board[lin][col] = true;
		}
	},

	is_valid_coordinates: function(lin, col) {
		return !(lin<0 || col<0
				|| lin>=this.board.length
		    	||col>=this.board[0].length)
	},

	is_opened: function(lin, col) {
        if(this.open_cells[lin][col]){
            return true;
        }else{
            return false;
        }
	}
}

