
import _ from 'lodash'

// Order given cells by x and then y coordinates, for more robust
// test comparisons.
export function sortedCells(cells) {
  return _.sortBy(cells, ['x', 'y'])
}
