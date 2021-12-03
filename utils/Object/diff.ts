import { isEqual } from 'lodash'

/**
 * get diff between objects
 * target {a:11, b:222, c:33}
 * source {b:222, c:444}    ['b','c']
 * ==> {a:11, c:33}
 * @param {Record<string, unknown>} target
 * @param {Record<string, unknown>} source
 * @return {*}  {Record<string, unknown>}
 */
const diff = (
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  Object.keys(target).forEach((key) => {
    if (key in source) {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (!isEqual(sourceValue, targetValue)) {
        result[key] = target[key]
      }
    } else {
      result[key] = target[key]
    }
  })
  return result
}

export { diff }
