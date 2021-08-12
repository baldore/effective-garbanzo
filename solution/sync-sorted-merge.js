"use strict";

const { createLogMinHeap } = require("./log-heap.js");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const heap = createLogMinHeap();

  logSources.forEach((source, index) => {
    const log = source.pop();
    heap.insert({ index, log });
  });

  let earliestLog = heap.extractRoot();

  while (earliestLog && earliestLog.log) {
    const { index: sourceIndex, log } = earliestLog;

    printer.print(log);

    const newLogFromLastSource = logSources[sourceIndex].pop();

    if (newLogFromLastSource) {
      heap.insert({
        index: sourceIndex,
        log: newLogFromLastSource,
      });
    }

    earliestLog = heap.extractRoot();
  }

  printer.done();

  return console.log("Sync sort complete.");
};
