#!/usr/bin/env bash

drews_expr=$(cat ./drews_expr.js)
test_file=$(cat ./test.dexpr)
test_file=${test_file//$'\\'/\\\\}
test_file=${test_file//$'\n'/\\n}
test_file=${test_file//$'\"'/\\\"}
test_code=$(cat ./test.js)

tests=$(cat <<CODE
	$drews_expr

  var test_dexpr_source = "$test_file";

	$test_code
CODE
)

echo "$tests" > _tmp_test_file.js
node _tmp_test_file.js

