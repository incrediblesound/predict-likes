Predict Likes
=============

This module relies on a library of objects each with an array of qualities to predict the likes of users.

<strong>New in 0.0.4</strong>: A control function has been added to generate more meaningful results. See changes in step two and in the default threshold of the predictLike method.

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

Step 2: To use the control method, first require the control master function.

    var predictionControl = require('predict-likes').control();

Then use the getTermFrequency to obtain the frequency of ocurrance for all terms in the library and setTermFrequency to load those values into the library. The functions are separated because calcuating term frequency could take a long time with large libraries, so you might want to run getTermFrequency and store the results in a database for quick retrieval.

```javascript
predictionControl.getTermFrequency(function(tf) {
  predictionControl.setTermFrequency(tf);
})
```

You can turn predictionControl off thusly:

    predict.useControl(False);

Turning predictionControl off is useful if you just want to check for the proportion of certain qualities in a given users likes and you are not concerned with the prevalence of those qualities in the library. 

Step 3: The setQualities method is used to define the qualities that you want to test for. If you want to see what percent of a persons favorites have the quality 'strength' verses the quality 'elegance', you would set like this:

    predict.setQualities(['strength', 'elegance']);

Step 4: At this point there are two possibilites. One is to use the process or processArray method to find the prevalence of the set qualities in a given persons likes compared to the prevalence of those qualities in the total library.

The process method takes an object and a callback and the processArray method takes an array and a callback:

```javascript
//these objects must have an id and a likes array
var john = {id: 'john', likes: ['yan','su','huang']};
var mary = {id: 'mary', likes: ['mi','su', 'huang']};

predict.process(john, function(result) {
	console.log(result);
})
//=> { john: { strength: 50, balance: 16, elegance: -33, fluidity: -33, individuality: 0 } }

predict.processArray([john,mary], function(results) {
	console.log(results);
})
//=> { john: { strength: 50, balance: 16, elegance: -33, fluidity: -33, individuality: 0 }, mary: { strength: 0, balance: -25, elegance: 9, fluidity: 9, individuality: 17 } }
```
John's strength score of 50 is because 100% of John's likes have the quality of strength, whereas only 50% of the calligraphers in the library have this quality. The individuality score of 0 means that the proportion of calligraphers with the individuality quality in the library matches the proportion in John's likes exactly. Mary gets a negative score on balance because only one out four of her likes has the quality balance, whereas three quarters of calligraphers in the library display this quality.

The last method is predictLike, which takes a person, a list of qualities, an optional threshold and a callback. The algorithm returns all the qualities which occur in the given persons likes at a percentage higher than the threshold, and the threshold defaults to 0 if not given.

```javascript

var mao = ['fluidity','elegance'];

factor.predictLike(mary, mao, function(result) {
    console.log(result);
})
//=>{ result: true, matches: [ { match: 'fluidity', certainty: 66 }, { match: 'elegance', certainty: 66 } ] }
```

Here we see that Mary might like Mao's calligraphy given that 66% percent of the calligraphers she likes have the qualities 'fluidity' and 'elegance', both of which are characteristic of Mao's.