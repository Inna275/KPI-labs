const mapAsync = (array, asyncCallback, finalCallback) => {
  let resultArray = [];
  let pending = array.length;

  if (pending === 0) {
    return finalCallback(null, resultArray);
  }

  const handleResult = (i, err, transformedItem) => {
    if (err) {
      return finalCallback(err, null);
    }
    resultArray[i] = transformedItem;
    pending--;

    if (pending === 0) {
      finalCallback(null, resultArray);
    }
  };

  for (let i = 0; i < array.length; i++) {
    asyncCallback(
      array[i], 
      (err, transformedItem) => handleResult(i, err, transformedItem)
    );
  } 
};

const toUpperCaseAsync = (str, callback) => {
  setTimeout(() => {
    callback(null, str.toUpperCase());
  }, 200); 
};

const words = ["hello", "world", "async", "map"];

mapAsync(words, toUpperCaseAsync, (err, result) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Uppercased words:", result);
  }
});

