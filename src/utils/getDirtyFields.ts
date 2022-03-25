// Map RHF's dirtyFields over the `data` received by `handleSubmit` and return the changed subset of that data.
/**
 *
 * @param {Record<string, any> | boolean} dirtyFields
 * @param {Record<string, any>} allValues
 * @return {Record<string, any>}
 */
export function getDirtyFields(dirtyFields: any, allValues: Record<string, any>): Record<string, any> {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
  // Here, we have an object
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [key, getDirtyFields(dirtyFields[key], allValues[key])])
  );
}
