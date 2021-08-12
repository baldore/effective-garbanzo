"use strict";

const { createLogMinHeap } = require("./log-heap.js");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = async (logSources, printer) => {
  const heap = createLogMinHeap();

  await Promise.all(
    logSources.map((source, index) =>
      source.popAsync().then((log) => {
        heap.insert({ index, log });
      })
    )
  );

  let earliestLog = heap.extractRoot();

  while (earliestLog && earliestLog.log) {
    const { index: sourceIndex, log } = earliestLog;

    printer.print(log);

    const newLogFromLastSource = await logSources[sourceIndex].popAsync();

    if (newLogFromLastSource) {
      heap.insert({
        index: sourceIndex,
        log: newLogFromLastSource,
      });
    }

    earliestLog = heap.extractRoot();
  }

  printer.done();

  return console.log("Async sort complete.");
};
