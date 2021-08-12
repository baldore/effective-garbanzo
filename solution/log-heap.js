"use strict";

const { CustomHeap } = require("@datastructures-js/heap");

/**
 * Creates a custom min heap to order log entries.
 * returns {CustomHeap}
 */
function createLogMinHeap() {
  return new CustomHeap((a, b) => a.log.date.getTime() - b.log.date.getTime());
}

module.exports = {
  createLogMinHeap,
};
