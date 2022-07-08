function fixMe(my_list){

    let new_list = [];
    if(my_list.length%2){
        for(let item of my_list){
            for(let element of item){
                new_list.push(element)
            }
        }
    } else {
        new_list = my_list.flat();
    }

    new_list.sort(function (x, y){
        if(x % 5 === y % 5){
            return y - x
        }else {
            return y % 5 - x % 5
        }
    })

    return new_list

}

// let arg = [ [3, 4] , [2, 6] ];
// let arg2 = [ [ 3, 4 ], [ 12, 32, 89 ], [ 0 ] ];

// console.log(fixMe(arg))
// console.log(fixMe(arg2))


function hasDuplicates(inputArray){

    for(let i=0; i<inputArray.length; i++){
        if(inputArray.includes(inputArray[i], i+1)){
            return true;
        }
    }

    return false;

}

console.log(hasDuplicates([1, 2, 3]))
console.log(hasDuplicates([1, 2, 3, 3]))
console.log(hasDuplicates([1, 2, 3, 8, 1, 4]))