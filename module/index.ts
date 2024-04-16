// map :: (a -> b) -> f a -> f b

// Array
const map = <A,B>(array: Array<A>, f: (a: A) => B) => {
  let result: Array<B> = [];

  for(let i = 0; i < array.length; i++) {
     result.push(f(array[i]))
  }

  return result;
}

const numbers = [1, 2, 3, 4];
const numberToString = (num: number) => `${num}`

console.log(map(numbers, numberToString));