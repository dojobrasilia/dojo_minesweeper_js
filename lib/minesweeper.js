
function Minesweeper(container_id,lin,col){
	
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
