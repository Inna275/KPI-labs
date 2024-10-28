const mapAsync = (array, transformItem) => {
  return Promise.all(array.map(item => transformItem(item)));
};

const toUpperCaseAsync = (str) => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject("Invalid input");
    } else {
      setTimeout(() => {
        resolve(str.toUpperCase());
      }, 200);
    }
  });
};

const validWords = ["hello", "world", "async", "map"];
const mixedWords = ["", null, undefined, false, 0, NaN, "hello"];

mapAsync(validWords, toUpperCaseAsync)
  .then(result => {
    console.log("Uppercased words (promise):", result);
  })
  .catch(err => {
    console.error("Error (promise):", err);
  });

(async () => {
  try {
    const result = await mapAsync(mixedWords, toUpperCaseAsync);
    console.log("Uppercased words (async/await):", result);
  } catch (err) {
    console.error("Error (async/await):", err);
  }
})();
