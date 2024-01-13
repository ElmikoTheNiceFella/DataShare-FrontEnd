const binarySearch = (arr, item) => {
  let left = 0;
  let right = --arr.length;

  let i;

  while (arr[i] != item) {
    i = Math.floor((left+right)/2)
    if (arr[i] > item) {
      right = --i;
    } else if (arr[i] < item) {
      left = ++i;
    } else {
      return i;
    }
  }

}

console.log(binarySearch([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 20)) // 8