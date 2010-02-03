
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

	it 'should bum when the only mine-cell is open'
		m = new Minesweeper('board', 1, 1, 1)
		m.open(1,1)
		m.bum().should.be true
	end

	describe 'with only one safe cell'
		
		before_each
			m = new Minesweeper('board', 1, 1, 0)
		end

		it 'should not bum when the only safe-cell is open'
			m.open(1,1)
			m.bum().should.be false
		end

		it 'should win when the only safe-cell is open'
			m.open(1,1)
			m.win().should.be true
		end
		
	end

  end
end