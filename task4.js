const fs = require('fs');
const readline = require('readline');

async function* readLines(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity 
  });

  for await (const line of rl) {
    yield line; 
  }
}

const countLines = (line, keyword, lineCounts) => {
  lineCounts.total++;
  if (line.includes(keyword)) {
    lineCounts.keyword++;
  }
};

const logProgress = (lineCounts) => {
  if (lineCounts.total % 100000 === 0) {
    console.log(`Processed lines: ${lineCounts.total}`);
  }
};

const outputResults = (lineCounts, keyword) => {
  console.log(`Total number of lines: ${lineCounts.total}`);
  console.log(`Number of lines containing the keyword "${keyword}": ${lineCounts.keyword}`);
};

const countLinesAndKeywords = async (filePath, keyword) => {
  const lineCounts = { total: 0, keyword: 0 };

  for await (const line of readLines(filePath)) {
    countLines(line, keyword, lineCounts); 
    logProgress(lineCounts); 
  }

  outputResults(lineCounts, keyword); 
};

const filePath = 'largeFile.txt'; 
const keyword = 'example';        
countLinesAndKeywords(filePath, keyword);
