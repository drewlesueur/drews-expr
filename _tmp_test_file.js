	/*
  todo 
  include empty lines.
  fix bug with double space
*/

var to_linked_list = function (list, list_i, parent_node, current_node) {
	var to_string = Object.prototype.toString
	var is_array = function (a) { return to_string.call(a) == '[object Array]' }
	
	if (!list_i) { list_i = 0}

	if (list_i == list.length) {
		return parent_node
	}

	var item = list[list_i]
	var new_current_node
	if (is_array(item)) {
		new_current_node = [to_linked_list(item, 0, null, null)]
	} else {
		new_current_node = [item]	
	}

	if (!parent_node) {
		parent_node = new_current_node
	} else {
	  current_node.push(new_current_node)
	}
	return to_linked_list(list, list_i + 1, parent_node, new_current_node)
}

var drews_expr = function (code, linked_list) {
	// have fun with the recusive version of this code
	var lines = code.split("\n")
	var len = lines.length
	var i = 0
	var line
	var trimmed_line
	var indent_count = 0
	var indent_stack = []
	var new_indent_count = 0
	var parsed_line
	var parsed_stack = []
	var parsed = []
	var in_string = false
	var is_less_indented
	var is_more_indented
	var is_same_indented
	var first_line_string = false;
	var last = function (obj) {
		return obj[obj.length - 1    ]
	}

	var keep_popping = function () {
			while (new_indent_count < indent_count) {
				pop_stuff()
			}
	}

	var first_index_of = function (list,str) {
		var index = 0
		var len = list.length
		
		while (index < len) {
			 var item = list[index]
			 if (item == str) {
				 return index
			 }
			 index++
		}
		return -1 
	}

	var is_valid_line = function () {
		if (line == "") { return false}
		if (indent_count == line.length) { return false }
		return true
	}

	var pop_stuff = function () {
		indent_count = indent_stack.pop()
		parsed = parsed_stack.pop()
	}

	var get_indent_count = function () {
		var ic = 0
		var line_len = line.length
		while (ic < line_len) {
			if (line.substr(ic,1) == " ") {
				ic++
			} else {
				break
			}
		}
		return ic
	}

	while (i < len) {
		line = lines[i]
		if (line.substr(0,1) == "#") {
			i++;
			continue;
			// use labels?
		} else if (!in_string && !is_valid_line()) {
			//parsed.push("");
			//i++;
			//continue;
		}
		new_indent_count = get_indent_count()
		trimmed_line = line.substr(new_indent_count)
		is_less_indented = new_indent_count < indent_count
		is_more_indented = new_indent_count > indent_count
		is_same_indented = new_indent_count == indent_count
		if (in_string) {
			if (is_more_indented && !first_line_string) {
				new_indent_count = indent_count
				is_more_indented = false
				is_same_indented = true
			}
			var last_index =  parsed_line.length - 1
			var current_str = parsed_line[last_index ] 
			if (is_same_indented && first_line_string) {
				in_string = false
				keep_popping()
			} else if (is_less_indented) {
				in_string = false
				new_indent_count = indent_count //???
			} else if (current_str ==  ""  ) {
				parsed_line[last_index] += line.substr(new_indent_count)
			} else { 
				parsed_line[last_index] += "\n" + line.substr(new_indent_count)
				// todo: you could use the join method
			}
			first_line_string = false;

		} else if (is_more_indented) {
			indent_stack.push(indent_count)
			indent_count = new_indent_count
			parsed_stack.push(parsed)
			parsed = parsed_line
		}
		
		if (is_less_indented) {
			keep_popping()
		}
		
		if (!in_string) {
			if (false || is_valid_line()) {
				parsed_line = trimmed_line.split(" ")
				empty_string_spot = first_index_of(parsed_line, "" )

				if (empty_string_spot != -1 ) {
					in_string = true
					var first_line_string = true;
					var my_len = parsed_line.length
					var word_size = my_len - empty_string_spot
					var string_stuff = parsed_line.splice(empty_string_spot + 1, word_size)
					var str = string_stuff.join(" ")
					var last_index =  parsed_line.length - 1
					parsed_line[last_index] = str
				}
				parsed.push(parsed_line)
			} else {
				
			}
		}
		indent_count = new_indent_count
		i++
	}
	while (indent_stack.length) {
		pop_stuff()
	}
	if (linked_list) {
		parsed = to_linked_list(parsed)
	}
	return parsed
}

  var test_dexpr_source = "some_stuff\n  name  Hello wolrd\n\nother things\n  name yo yo \"test\" \\some stuff \\\"\n\nmap\n  name Map\n\nwhat  about this really cool one\n\nsimple thing\n  a nested string  for fun\n    fun stuff here\n      and here\n    and here2\n  a not nested string\n\nbut this?\n\nwhat  about this long string\nand more stuff here";

	var test_dexpr = drews_expr(test_dexpr_source)
var first_expected = [["some_stuff",["name","Hello wolrd"]],["other","things",["name","yo","yo","\"test\"","\\some","stuff","\\\""]],["map",["name","Map"]],["what","about this really cool one"],["simple","thing",["a","nested","string","for fun\nfun stuff here\n  and here\nand here2"],["a","not","nested","string"]],["but","this?"],["what","about this long string"],["and","more","stuff","here"]]
if (JSON.stringify(test_dexpr) == JSON.stringify(first_expected)) {
	console.log("first test passed")
} else {
	console.log("first test failed")
	console.log(JSON.stringify(test_dexpr))
}

var second_expected = [["some_stuff",[["name",["Hello wolrd"]]]],[["other",["things",[["name",["yo",["yo",["\"test\"",["\\some",["stuff",["\\\""]]]]]]]]]],[["map",[["name",["Map"]]]],[["what",["about this really cool one"]],[["simple",["thing",[["a",["nested",["string",["for fun\nfun stuff here\n  and here\nand here2"]]]],[["a",["not",["nested",["string"]]]]]]]],[["but",["this?"]],[["what",["about this long string"]],[["and",["more",["stuff",["here"]]]]]]]]]]]]
var test_dexpr_linked = drews_expr(test_dexpr_source, true)
if (JSON.stringify(test_dexpr_linked) == JSON.stringify(second_expected)) {
	console.log("linked list test passed")
} else {
	console.log("linked list test failed")
	console.log(JSON.stringify(test_dexpr_linked))
}
