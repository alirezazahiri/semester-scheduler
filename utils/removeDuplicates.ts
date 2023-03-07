function removeDuplicates<T>(items: T[]) {
  const seen = new Set();
  const output = [];
  for (let i = 0; i < items.length; i++) {
    const obj = items[i];
    const key = JSON.stringify(obj);
    if (!seen.has(key)) {
      seen.add(key);
      output.push(obj);
    }
  }
  return output;
}

export default removeDuplicates