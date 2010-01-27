
describe 'Minesweeper'
  describe 'init'

	it 'should draw a table for the board'

		htmlElement = $(fixture('teste'))
		
		htmlElement.should.have_id 'board'
		htmlElement.children().should.be_empty

		m = new Minesweeper(htmlElement)
		
		htmlElement.find('table').should.have_length 1
		
	end

	it 'should draw 2 lines x 3 cols'
	
		htmlElement = $(fixture('teste'))
		
		m = new Minesweeper(htmlElement, 2, 3)
		table = htmlElement.find('table')
		
		table.find('tr').should.have_length 2
	
	end

  end
end