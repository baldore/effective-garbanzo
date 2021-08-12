"use strict";

const { CustomHeap } = require('@datastructures-js/heap');

function createLogMinHeap() {
  return new CustomHeap((a, b) => {
    return a.log.date.getTime() - b.log.date.getTime()
  });
}

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // console.log(logSources[0].pop())

  const heap = createLogMinHeap()

  logSources.forEach((source, index) => {
    const log = source.pop()
    heap.insert({ index, log })
  })

  let earliestLog = heap.extractRoot()

  while (earliestLog && earliestLog.log) {
    printer.print(earliestLog.log)
    earliestLog = heap.extractRoot()
  }

  printer.done()

  return console.log("Sync sort complete.");
};
