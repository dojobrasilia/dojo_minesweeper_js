
function Minesweeper(container,lin,col){
	
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
