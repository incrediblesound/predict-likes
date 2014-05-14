var factor = require('./main.js');

var qualities = ['strength','balance','elegance','fluidity'];

var calligraphers = {
	yan:['strength','balance'],
	wang:['elegance','balance','fluidity','strength'],
	su:['strength','balance','fluidity'],
	mi:['fluidity','elegance'],
	huang:['strength','elegance']
};

var mao = ['fluidity','elegance'];

var john = {id: 'john', likes: ['yan','su','huang']};
var mary = {id: 'mary', likes: ['mi','su', 'huang','mao']};

factor.setObject(calligraphers);

factor.addObject('mao',['fluidity','elegance']);

factor.setQualities(qualities);

factor.processArray([john,mary], function(result) {
	console.log(result);
});

//factor.predictLike(mary, mao, function(result) {
//	console.log(result);
//})

