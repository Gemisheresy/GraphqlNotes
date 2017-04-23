const {graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String,
        id: Int
    }
`);

const root ={
    hello: () => {
        return "Hello world"
    },
    id: ()=> {
        return 5
    }
}

graphql(schema,'{ id }',root)
    .then((response) => {
        console.log(response)
    })
    .catch((err)=> {console.log(err)});