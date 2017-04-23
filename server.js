const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
//Type of return needs to be scholar types String, Boolean, Int, Float
//Wrapping brackets means that it will be a collection [Int]
//Each field can be nullable 
// Adding a exclamation makes a field non nullable
const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Int
        rollThreeDice: [Int]
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);
//Root contains all the functions used to access the schema
//Because they use fat arrows they dont have a bound lexi this 
//meaning they can be used on any model given to them 
const root = {
    quoteOfTheDay: ()=>{
        return Math.random()< 0.5 ? "Take it easy" : "Salvation lies within"
    },
    random: ()=> { 
        return  Math.floor(Math.random() * 1000000) +1
    },
    rollThreeDice: ()=>{
        return [1,2,3].map(_ => 1 + Math.floor(Math.random() * 6 ))
    },
    rollDice: function (args) {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  }
};
const app = express();
app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
