
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

		it 'should construct with number of mines'
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
			m.neighborCount = function(l,c) {
				return 34;
			}
			cell = container.find('td:first-child').next()
			cell.click()
			cell.text().should.be '34'
		end
		
		it 'should open the neighbor of a zero and show in the html'
		    m = new Minesweeper('board',1,3)
		    
		    cell = container.find('td:first-child').next()
			cell.click()
			
			container.find('td:first-child').text().should.be '0'
			container.find('td:first-child').next().text().should.be '0'
			container.find('td:first-child').next().next().text().should.be '0'
			
		end
		
		it 'should open only the neighbor of the zero and show the right numbers in the html'
		    m = new Minesweeper('board',1,3)
		    m.install_mine(0,0)
		    
		    cell = container.find('td:first-child').next().next()
			cell.click()
			
			container.find('td:first-child').text().should.be ''
			container.find('td:first-child').next().text().should.be '1'
			container.find('td:first-child').next().next().text().should.be '0'
			
		end

	end

	describe 'install_mine'

		before_each
			m = new Minesweeper('board',1,3)
			m.install_mine(0,0)
		end

		it 'should not increment the mine counter when install 2 mines on the same cell'
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

            describe 'in a 3x3 cells board without mines'

                it 'should open one neighbor when cell is 0'
                   m = new Minesweeper('board', 3, 3);

                   m.open(0,0);
                   m.is_opened(1,0).should.be true
                end

                it 'should not be open at startup'
                    m = new Minesweeper('board', 1, 1)
                    m.is_opened(0,0).should_not.be true
                end

                it 'should not be open when it should not '
                    m = new Minesweeper('board', 1, 3)
                    m.install_mine(0,0)
                    m.open(0,1)
                    m.is_opened(0,2).should_not.be true
                end

				it 'should open left neighbour of zero'
                    m = new Minesweeper('board', 1, 3)
                    m.install_mine(0,0)
                    m.open(0,2)
                    m.is_opened(0,1).should.be true
                end

				it 'should open left and right neighbours of zero'
                    m = new Minesweeper('board', 1, 4)
                    m.install_mine(0,0)
                    m.open(0,2)
                    m.is_opened(0,1).should.be true
					m.is_opened(0,3).should.be true
                end

				it 'should open two left neighbours of zero'
                    m = new Minesweeper('board', 1, 4)
                    m.install_mine(0,0)
                    m.open(0,3)
                    m.is_opened(0,1).should.be true
					m.is_opened(0,2).should.be true
                end

				it 'should open three left neighbours of zero'
                    m = new Minesweeper('board', 1, 5)
                    m.install_mine(0,0)
                    m.open(0,4)
                    m.is_opened(0,1).should.be true
                    m.is_opened(0,2).should.be true
					m.is_opened(0,3).should.be true
                end

				it 'should open three left neighbours of zero'
                    m = new Minesweeper('board', 2, 3)
                    m.install_mine(1,2)
                    m.open(0,0)
                    m.is_opened(0,1).should.be true
                    m.is_opened(1,1).should.be true
					m.is_opened(1,0).should.be true
                end

                it 'should open all cells but the mine'
                    m = new Minesweeper('board', 3, 3)
                    m.install_mine(0,0)
                    
					m.open(2,2)

                    m.is_opened(0,0).should_not.be true
                    m.is_opened(0,1).should.be true
                    m.is_opened(0,2).should.be true
                    m.is_opened(1,0).should.be true
                    m.is_opened(1,1).should.be true
                    m.is_opened(1,2).should.be true
                    m.is_opened(2,0).should.be true
                    m.is_opened(2,1).should.be true
                    m.is_opened(2,2).should.be true
                end
			end

		end

	end

	describe 'random mines method'

		before_each
			random_backup = Math.random;
		end

		after_each
			Math.random = random_backup;
		end

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

		it 'should install 4 mines'

			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(4)

			m.mines.should.be 4

		end

		it 'should call Math.random'

			var called = false;
			Math.random = function() {
				called=true;
				return 0;
			}

			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(1)

			called.should.be true

		end

		it 'should use the random result as board indexes'

			Math.random = function() {
				return 0.9;
			}
			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(1)

			m.open(2,2).should.be '*'

		end

		it 'should shuffle again when the same coordinates are shuffled :-P'

			var cont=0
			Math.random = function() {
				if (cont++ < 4) {
					return 0.9;
				} else {
					return 0.2
				}
			}

			m = new Minesweeper('board', 3, 3)
			m.random_install_mines(2)

			cont.should.be 6

			m.open(2,2).should.be '*'
			m.open(0,0).should.be '*'

		end

		it 'should recover from installing more mines than cells '
		end

        it 'should not break when random returns 1'
        end

	end


	// TODO cores diferentes para celulas abertas, e com minas


	// Mostrar números


end

