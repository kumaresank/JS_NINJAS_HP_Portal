const mongoose = require("mongoose");

// TODO: I should probably worry about timezones but no time so ignoring.
const slotSchema = new mongoose.Schema({
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to the 'User' model
      required: true
    },
    date: {
      type: String,
      required: true
    },
    slots: [{
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      }
    }],
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;