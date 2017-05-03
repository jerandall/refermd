/**
 * Practice model events
 */

'use strict';

import {EventEmitter} from 'events';
var Practice = require('../../sqldb').Practice;
var PracticeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PracticeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Practice.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PracticeEvents.emit(event + ':' + doc._id, doc);
    PracticeEvents.emit(event, doc);
    done(null);
  }
}

export default PracticeEvents;
