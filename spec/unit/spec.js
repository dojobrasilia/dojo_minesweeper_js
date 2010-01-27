
describe 'Minesweeper'
  describe 'init'

	it 'should draw a table for the board'

		htmlElement = $(fixture('teste'))
		htmlElement.should.have_id 'board'
		htmlElement.children().should.be_empty

		m = new Minesweeper(htmlElement, 2, 3)
		
		htmlElement.find('table').should.have_length 1
		
	end
  end
end