const fill = (array, rowIndex, colIndex, newColor, current) => {
  // Return if the current block is out of bounds
  if (
    rowIndex < 0 ||
    rowIndex >= array.length ||
    colIndex < 0 ||
    colIndex >= array[0].length
  ) {
    return;
  } else if (
    // Return if the color of the block is not the same as the starting current color

    array[rowIndex][colIndex].r !== current.r ||
    array[rowIndex][colIndex].g !== current.g ||
    array[rowIndex][colIndex].b !== current.b
  ) {
    return;
  } else {
    // Set the new color to the current block
    array[rowIndex][colIndex] = newColor;

    // Recursively call the fill function on the surrounding blocks
    fill(array, rowIndex + 1, colIndex, newColor, current);
    fill(array, rowIndex - 1, colIndex, newColor, current);
    fill(array, rowIndex, colIndex + 1, newColor, current);
    fill(array, rowIndex, colIndex - 1, newColor, current);
  }
};

const floodFill = (array, rowIndex, colIndex, newColor) => {
  const current = array[rowIndex][colIndex];

  // If newColor is same as current, return unmodified array
  if (current === newColor) {
    return array;
  }

  // Otherwise call the fill function to fill the existing array
  fill(array, rowIndex, colIndex, newColor, current);

  // Return the array after filling
  return array;
};

export default floodFill;
