// Test to make sure that empty trie does not return any words
QUnit.test( "Create Empty Trie", function (assert) {
	var trie = Trie();
	assert.strictEqual(trie.get("a", 10).length, 0, "no words begin with a");
	assert.strictEqual(trie.get("", 10).length, 0, "no words at all");
	});

// Insert words using "add" and make sure they are retrievable using "get"
QUnit.test( "Words in Dictionary Appear", function (assert) {
	var trie = Trie();
	trie.add("apples");
	assert.deepEqual(trie.get("a", 10), ["apples"], "apples should appear in trie");
	trie.add("application");
	assert.deepEqual(trie.get("appli", 10), ["application"], "application should appear in trie");
	});

// Make sure that if a word is a prefix of another word, both are recorded
QUnit.test( "Words that are Prefixes Appear", function (assert) {
	var trie = Trie();
	trie.add("tree");
	trie.add("treehouse");
	assert.deepEqual(trie.get("tr", 10), ["tree", "treehouse"], "both words should appear in trie");
	});

// Make sure there are no duplicate words if we add a word twice
QUnit.test( "No Duplicates", function (assert) {
	var trie = Trie();
	trie.add("apples");
	trie.add("apples");
	trie.add("oranges");
	assert.strictEqual(trie.get("a", 10).length, 1, "apples should appear once");
	});

// Make sure at most ten items are shown, and less is shown if there are less than ten results
QUnit.test( "At Most Ten Items", function (assert) {
	var trie = Trie();
	trie.add("under");
	trie.add("unfeasible");
	trie.add("unknowingly");
	trie.add("unknown");
	trie.add("understatement");
	trie.add("understanding");
	trie.add("unethical");
	trie.add("unionizable");
	trie.add("uninteresting");
	trie.add("unremarkable");
	trie.add("unbelievable");
	assert.strictEqual(trie.get("un", 10).length, 10, "Should not return over ten items");
	assert.strictEqual(trie.get("under", 10).length, 3, "Could be under ten items");
	});

// Make sure that the list of words returned is sorted
QUnit.test( "Items Are Sorted", function (assert) {
	var trie = Trie();
	trie.add("pancake");
	trie.add("pink");
	trie.add("pig");
	trie.add("pop");
	trie.add("pad");
	
	var expected = ["pad", "pancake", "pig", "pink", "pop"];
	assert.deepEqual(trie.get("p", 10), expected, "Should contain sorted words");
	});
