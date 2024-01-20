// const binarySearch = (arr, item) => {
//   let left = 0;
//   let right = --arr.length;

//   let i;

//   while (arr[i] != item) {
//     i = Math.floor((left+right)/2)
//     if (arr[i] > item) {
//       right = --i;
//     } else if (arr[i] < item) {
//       left = ++i;
//     } else {
//       return i;
//     }
//   }

// }

// const newObj = {helo: "World"}

// const myObj = {
//   sections: [["sect", 1, {}], ["se3t", 2, {}]]
// }

// for(let i = 0; i < myObj.sections.length; i++) {
//   if (myObj.sections[i][1] == 2) {
//     myObj.sections[i][2] = {
//       ...myObj.sections[i][2],
//       helo: newObj.helo
//     }
//   }
// }

// console.log(myObj);