const mapAsync = (array, transformItem, signal) => {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      return reject("Operation cancelled");
    }

    const onAbort = () => reject("Operation cancelled");
    signal.addEventListener("abort", onAbort);

    Promise.all(array.map(transformItem))
      .then(resolve)
      .catch(reject)
      .finally(() => {
        signal.removeEventListener("abort", onAbort);
      });
  });
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

const words = ["hello", "world", "async", "map"];

const controller = new AbortController();
const { signal } = controller;

mapAsync(words, toUpperCaseAsync, signal)
  .then(result => {
    console.log("Uppercased words:", result);
  })
  .catch(err => {
    console.error("Error:", err);
  });

setTimeout(() => {
  controller.abort();
  console.log("Operation cancelled by user");
}, 100);
