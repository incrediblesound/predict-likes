var factor = require('./main.js');
var control = factor.control();

var qualities = ['strength','balance','elegance','fluidity','influence','individuality','creativity'];

var calligraphers = {
	yan:['strength','balance','influence'],
	wang:['elegance','balance','fluidity','creativity','influence'],
	su:['strength','balance','fluidity', 'influence'],
	mi:['fluidity','elegance','creativity','individuality'],
	huang:['strength','elegance','creativity','individuality']
};

var mao = ['fluidity','elegance','individuality'];

var james = {id: 'James', likes: ['yan','su','huang']};
var mary = {id: 'mary', likes: ['mi','su', 'huang','mao']};

factor.setObject(calligraphers);

factor.addObject('mao',['fluidity','elegance']);

factor.setQualities(qualities);

control.getTermFrequency(function(tf) {
	control.setTermFrequency(tf);
})

//factor.useControl(true);

//factor.processArray([james,mary], function(result) {
	//console.log(result);
//});

factor.predictLike(mary, mao, function(result) {
	console.log(result);
})

