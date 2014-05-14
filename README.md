Predict Likes
=============

This module relies on a library of objects each with an array of qualities to predict the likes of users.

All methods are in the main module:

    var predict = require('predict-likes');


Step 1: The library is an object with a key-value pair for each member. The setObject method can be used if all of your data is in one place:

```javascript
var calligraphers = {
	yan:['strength','balance'],
	wang:['elegance','balance','fluidity','strength'],
	su:['strength','balance','fluidity'],
	mi:['fluidity','elegance'],
	huang:['strength','elegance']
};

predict.setObject(calligraphers);
```

Data can be added to the library with the addObject method, where the first argument is the name of the item and the second argument is an array of its qualities:

    predict.setObject('mao',['fluidity','elegance']);

Step 2: The setQualities method is used to define the qualities that you want to test for. If you want to see what percent of a persons favorites have the quality 'strength' verses the quality 'elegance', you would set like this:

    predict.setQualities(['strength', 'elegance']);

Step 3: At this point there are two possibilites. One is to use the process or processArray method to find the prevalence of the set qualities in a given persons likes.

The process method takes an object and a callback and the processArray method takes an array and a callback:

```javascript
//these objects must have an id and a likes array
var john = {id: 'john', likes: ['yan','su','huang']};
var mary = {id: 'mary', likes: ['mi','su', 'huang']};

predict.process(john, function(result) {
	console.log(result);
})
//=> { john: { strength: 100, balance: 66, elegance: 33, fluidity: 33 } }

predict.processArray([john,mary], function(results) {
	console.log(results);
})
//=> { john: { strength: 100, balance: 66, elegance: 33, fluidity: 33 }, mary: { strength: 66, balance: 33, elegance: 66, fluidity: 66 } }
```
from these results it is clear that john likes calligraphy that shows strength, whereas mary is drawn to calligraphy that lacks balance.

The last method is predictLike, which takes a person, a list of qualities, an optional threshold and a callback.The algorithm returns all the qualities which occur in the given persons likes at a percentage higher than the threshold, and the threshold defaults to 50 if not given.

```javascript

var mao = ['fluidity','elegance'];

factor.predictLike(mary, mao, function(result) {
    console.log(result);
})
//=>{ result: true,
  matches: 
   [ { match: 'fluidity', certainty: 66 },
     { match: 'elegance', certainty: 66 } ] }
```

Here we see that Mary might like Mao's calligraphy given that 66% percent of the calligraphers she likes have the qualities 'fluidity' and 'elegance', both of which are characteristic of Mao's.