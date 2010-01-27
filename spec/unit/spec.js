
describe 'Minesweeper'
  describe 'init'

	it 'should draw a table for the board'
		htmlElement = $(fixture('teste')).filter("#board")
		m = new Minesweeper(htmlElement, 2, 3)
		$(htmlElement)
		
	end
  end
end