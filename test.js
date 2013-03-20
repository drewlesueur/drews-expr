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
