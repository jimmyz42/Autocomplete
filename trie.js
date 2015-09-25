// Trie data structure to support efficient adding of words and reTRIEval of words
//   The trie is represented as a tree, where the characters are along the edges, and a path from
// the root to a node determines the word/prefix. A node that is actually the end of a word
// contains the "value" property that is equal to the word, to distinguish it from nodes that
// are merely the end of a prefix.
var Trie = function() {
	// Trie object to be returned
	var that = Object.create(Trie.prototype);

	// Root of Trie (private variable)
	var root = {};

	// Returns a function that, given a node, and the current character, goes to the child of
	// the trie corresponding to that character. (private function)
	// @param modify True if we allow the trie to create new children, False otherwise
	var down = function (modify) {
		return function (node, char) {
			if(!(char in node) && modify) {
				node[char] = {};
				}
			return node[char];
			};
		};

	// Returns a function that, given a character, goes to the child of the trie corresponding
	// to that characters and retrieves the first "limit" words in that subtree. (private function)
	// @param node Node we want to recurse on
	// @param limit The max number of results to be returned
	var getSingleChild = function (node, limit) {
		return function (char) {
			return getFromSubtree(node[char], limit);
			};
		};

	// Returns a list of the first "limit" words in the subtree given by "node". (private function)
	// @param node Node to recurse on
	// @param limit The max number of results to be returned
	var getFromSubtree = function (node, limit) {
		var res = [];
		if("value" in node) {
			res.push(node.value);
			}
		return Object.keys(node).filter(function (key) {
			return key !== "value";
			}).map(getSingleChild(node, limit)).reduce(function (ar1, ar2) {
				return ar1.concat(ar2);
			}, res).sort().slice(0, limit);
		};


	// Public function that adds a word to the trie.
	// @param word Word to be added.
	that.add = function(word) {
		// EXAMPLE USE OF FUNCTIONALS
		// This functional, using reduce, makes it really easy to add a word to the trie in
		// one line, being clear and concise. We split the word into a character array so we
		// can apply reduce using the "down" function starting with the root, to go down the
		// trie and create new nodes as neccessary, and then assign the word to the resulting
		// node.
		word.split("").reduce(down(true), root).value = word;
		};

	// Public function that gets the first "limit" words starting with "prefix".
	// @param prefix The prefix returned words must start with.
	// @param limit The max number of results to be returned
	that.get = function(prefix, limit) {
		var node = prefix.split("").reduce(down(false), root);
		if(node === undefined) {
			return [];
			}
		else {
			return getFromSubtree(node, limit);
			}
		};

	return that;
	};
