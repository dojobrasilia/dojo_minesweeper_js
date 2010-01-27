load('spec/support/env.js')
Envjs('spec/fixtures/teste.html')
load('spec/support/jquery.js')

load('/Users/Bruno/.gem/ruby/1.8/gems/jspec-3.1.3/lib/jspec.js')
load('/Users/Bruno/.gem/ruby/1.8/gems/jspec-3.1.3/lib/jspec.xhr.js')
load('/Users/Bruno/.gem/ruby/1.8/gems/jspec-3.1.3/lib/jspec.jquery.js')

load('lib/yourlib.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()