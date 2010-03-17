
// TODO: fixtures

describe 'Minesweeper'

	before_each
		container = $('#board');
		container.empty();
	end

	describe 'init'


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

	describe 'click in the td'
		

		it 'should call open'
			m = new Minesweeper('board',1,1)
			var called = false;
			m.open = function(l,c) {
				l.should.be 0
				c.should.be 0
				called = true;
			}
			container.find('td').click()
			called.should.be true
		end
		
		it 'should call open with the right coordinates'
			m = new Minesweeper('board',1,2)
			var called = false;
			m.open = function(l,c) {
				l.should.be 0
				c.should.be 1
				called = true;
			}
 			container.find('td:first-child').next().click()
			called.should.be true
		end
		
		it 'should call open with the right coordinates with 3 cells'
			m = new Minesweeper('board',1,3)
			var called = false;
			m.open = function(l,c) {
				l.should.be 0
				c.should.be 2
				called = true;
			}
 			container.find('td:last-child').click()
			called.should.be true
		end
		
		it 'should show the number of neighbor mines in a non-mine cell'
			m = new Minesweeper('board',1,3)
			m.open = function(l,c) {
				return 34;
			}
			cell = container.find('td:first-child').next()
			cell.click()
			cell.text().should.be '34'
		end
		
	end
	
	describe 'install_mine'
	
		it 'should not install 2 mines on the same cell'
			m.install_mine(0,0)
			m.open(0,1)
			m.win().should.be false
		end
	
		it 'should not install outside the board'
		
			try {
				m.install_mine(0,3);
				fail('should have thrown exception');
			} catch (e) {	
				e.should.be "mine out of bounds"
			}

			try {
				m.install_mine(3,0);
				fail('should have thrown exception');
			} catch (e) {	
				e.should.be "mine out of bounds"
			}
		
			try {
				m.install_mine(0,-1);
				fail('should have thrown exception');
			} catch (e) {	
				e.should.be "mine out of bounds"
			}
		
			try {
				m.install_mine(-1,0);
				fail('should have thrown exception');
			} catch (e) {	
				e.should.be "mine out of bounds"
			}
		
		end
	
	end
	
	describe 'open method'

		it 'should bum when the only mine-cell is open'
			m = new Minesweeper('board', 1, 1)
			m.install_mine(0,0)
			m.open(0,0)
			m.hasExploded().should.be true
		end

		describe 'with only one safe cell'
		
			before_each
				m = new Minesweeper('board', 1, 1)
			end

			it 'should not win if the cell is not open'
				m.win().should.be false
			end
		
			it 'should not bum when the only safe-cell is open'
				m.open(0,0)
				m.hasExploded().should.be false
			end

			it 'should win when the only safe-cell is open'
				m.open(0,0)
				m.win().should.be true
			end
		
		end
	
		describe 'with two cells, one mine at 0,0'
	
			before_each
				m = new Minesweeper('board', 1, 2)
				m.install_mine(0,0)
			end
	
			it 'should bum at 0,0'
				m.open(0,0)
				m.hasExploded().should.be true
			end

			it 'should not bum at 0,1'
				m.open(0,1)
				m.hasExploded().should.be false
			end

			it 'should not win when open 0,0'
				m.open(0,0)
				m.win().should.be false
			end

			it 'should win when open 0,1'
				m.open(0,1)
				m.win().should.be true
			end
	
		end

		describe 'with three cells, one mine at 0, 0'
		
			before_each
				m = new Minesweeper('board', 1, 3)
				m.install_mine(0,0)
			end

			it 'should not bum and not win at 0,1'
				m.open(0,1)
				m.hasExploded().should.be false
				m.win().should.be false
			end
			
			it 'should win when open the 2 safe cells'
				m.open(0,1)
				m.open(0,2)
				m.win().should.be true
			end
		
		end
		
		describe 'return value'

			describe 'in a two cells board with one mine at 0,0'

				before_each
					m = new Minesweeper('board', 1, 2)
					m.install_mine(0,0)
				end

				it 'should return 1 neighbor on 0,1'
					m.open(0,1).should.be 1
				end

				it 'should return * on 0,0'
					m.open(0,0).should.be '*'
				end

			end

			describe 'in a 2x2 cells board'

				before_each
					m = new Minesweeper('board', 2, 2)
				end

				it 'should be two with 2 neighbor bombs'
					m.install_mine(0,0)
					m.install_mine(0,1)
					m.open(1,1).should.be 2
				end

			end

			describe 'in a 3x3 cells board'

				before_each
					m = new Minesweeper('board', 3, 3)
					m.install_mine(0,0)
					m.install_mine(0,1)
					m.install_mine(1,0)
					m.install_mine(2,0)
					m.install_mine(2,2)
				end

				it 'should have 5 neighbor bombs'
					m.open(1,1).should.be 5
				end

			end

		end
		
	end
	
	describe 'random mines method'
	
		it 'should install 2 mines'
			
			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(2)
			
			m.mines.should.be 2
			
		end
		
		it 'should install 3 mines'
			
			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(3)
			
			m.mines.should.be 3
			
		end
		
		// it 'should install 4 mines'
		// 	
		// 	m = new Minesweeper('board', 3, 3)
		// 	m.random_install_mines(4)
		// 	
		// 	m.mines.should.be 4
		// 	
		// end
		
		
		
	
	end
	
	// TODO cores diferentes para celulas abertas, e com minas
	
	
	// Mostrar números
	
	
end
