exports.setQualities = function(array) {
	forEach(array, function(item) {
		library.qualities.push(item);
	})
	return;
};

exports.setObject = function(object) {
	library.objects = object;
	return;
}

exports.addObject = function(key, values) {
	library.objects[key] = values;
	return;
}

exports.process = function(person, fn) {

	var node = new Node(library);
	var net = {
    IO: function(person) {
        var results = {};
        results[person.id] = node.process(person.likes, node.results);
		return results;
		}
	};

	return fn(net.IO(person));
}

exports.predictLike = function(person, thing, threshold, fn) {
	if( typeof threshold === 'function') {
		var fn = threshold;
		var threshold = 50;
	}
	var node = new Node(library);
	var net = {
    IO: function(person) {
        var results = {};
        results[person.id] = node.process(person.likes, node.results);
		return results;
		}
	};
	var stats = net.IO(person);
	var matches = [];

	forEach(thing, function(attribute) {
		if(stats[person.id][attribute] !== undefined && stats[person.id][attribute] > threshold) {
			matches.push({match: attribute, certainty: stats[person.id][attribute]})
		}
	})
	if(matches.length > 0) {
		return fn(matches);
	} else {
		return fn(false);
	}
}
exports.processArray = function(array, fn) {
	var net = {
    IO: function(array) {
        var results = {};
        forEach(array, function(person) {
        	var node = new Node(library);
        	results[person.id] = node.process(person.likes, node.results);
        })
		return results;
		}
	};

	return fn(net.IO(array));
}

var library = {
	qualities: [],
	objects: {}
};

function Node(library) {
	this.results = makeResults(library.qualities);
	this.process = function(person, results) {
		forEach(library.qualities, function(factor) {
			forEach(person, function(like) {
			if(library.objects[like].indexOf(factor) !== -1) {
				results[factor].push(1);
			} else {
				results[factor].push(0);
			}
		});
	});
    for(var x in results) {
        results[x] = truthNode(this.results[x]);
    }
	return results;	
	}
	
}

function truthNode(array) {
	var output = Math.floor((sum(array)/array.length)*100);
	return output;
}

var _slice = Array.prototype.slice;

function sum(array) {
	var result = 0;
	for(var i = 0; i<array.length; i++) {
		result += array[i];
	}
	return result;
}

function makeResults(factors) {
	var results = {};
	forEach(factors, function(factor) {
		results[factor] = [];
	})
	return results;
}

function forEach(array, fn) {
	for(var i = 0; i < array.length; i++) {
		fn(array[i], i);
	}
}



