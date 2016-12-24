
Important directories
	css_includes
		css for the stimuli (same name.css)
	data_includes
		experimental file (test.js)
	js_includes
		different types of stimuli you can run, jquery ui widgets
	other_includes
		media that you're serving	
	www
		server.py
			go and run to test the server

Experiment file

	order of your items
		seq: concatenates a list of things
		sepWith: separates some widget with another
		rshuffle: randomly chooses from each stimulus condition, and then shuffles the results
		
	var shuffleSequence = seq(sepWith("sep", "practice"), "next", sepWith("sep", rshuffle("f", rshuffle("1_1_ir_some", "1_1_ir_all", "1_2_ir_some", "1_2_ir_all", "2_1_ir_some", "2_1_ir_all", "2_2_ir_some", "2_2_ir_all"))));

	items are declared in "var items" as a list of lists
		each item:
			["stim type name for shuffleSequnece", "widget", {options for the widget}]
			
How ibex works
	when it loads the file, it runs three calls to the server
		server.py?include=data
			your experimental file
		server.py?include=js
			all the js files in js_includes as ONE concatenated file
		server.py?include=css
			all the cs files in css_includes as ONE concatenated file

		