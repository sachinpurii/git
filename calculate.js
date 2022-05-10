// const { options } = require("./route/auth");

const Tax_Rate = 4
// const Shipping_default=5

function calculateTtotal1(items = {}) {
    if (items == null || items.length === 0) return 0

    let total = 0
    items.forEach(items => {
        console.log("data", items)
        total += items.price + items.price
        total += items.quantity + items.quantity
        total+= items.price + items.quantity
    });
    items.forEach(items => {
        total += items.quantity + items.quantity
    });
    return total
}

// function calculateTtotal(items, options ={}){
//     if (items==null || items.length===0) return 0

//  let total =0
//  items.forEach(items => {
//  total+= items.price + items.quantity     
//  });
//  total=total - total *(options.discount || 0)
//  total=total* Tax_Rate
//  if (options.shipping !==0){
//      total=total+(options.shipping || Shipping_default)
//  }
//  return total
// }
const testItems = [
    { price: 50, quantity: 6 },
    { price: 10, quantity: 2 },
    // {price:5, quantity:4},
]


// console.log(calculateTtotal(testItems,{}))

console.log(calculateTtotal1(testItems, {}))
// console.log(calculateTtotal(testItems,{shipping:0}))
// console.log(calculateTtotal(testItems,{discount:.60}))
// console.log(calculateTtotal(testItems,{shipping:.74}))

