
// TODO: fixtures

describe 'Minesweeper'
  describe 'init'

	before_each
		container = $('#board');
		container.empty();
	end

	it 'should draw a table for the board'

		container.should.have_id 'board'
		container.children().should.be_empty

		m = new Minesweeper('board',1,1)
		
		container.find('table').should.have_length 1
		
	end

	it 'should draw 2 lines x 3 cols'
	
		m = new Minesweeper('board', 2, 3)
		table = container.find('table')
		
		table.find('tr').should.have_length 2
		table.find('td').should.have_length 6
		
	end

  end
end