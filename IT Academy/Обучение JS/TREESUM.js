"use strict"


var test =      [ 5, 7, 
        [ 4, [2], 8, [1,3], 2 ], 
        [ 9, [] ], 
        1, 8
      ];

function treesum(array, i = 0) {
  if (isFinite(array))
    return Number(array);
  else if (typeof array == "object" && i < array.length)
    return treesum(array[i]) + treesum(array, i + 1);
  return 0;
}

console.log(treesum(test));



