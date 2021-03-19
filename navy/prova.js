const jsObjects = [
  {id: 1, displayName: "First"}, 
  {id: 2, displayName: "Second"}, 
  {id: 3, displayName: "Third"}, 
  {id: 4, displayName: "Fourth"}
]

// You can use the arrow function expression:
const n=3
const result = jsObjects.find(obj => {
	// Returns the object where
	// the given property has some value 
  	return obj.id === n
})

console.log(result)

// Output: {id: 1, displayName: "First"}