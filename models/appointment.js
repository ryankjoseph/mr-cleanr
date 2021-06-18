const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//service data is recreated in case the original agent decides to delete the service, so appointment saves an instance of the service
const appointmentSchema = new Schema({
  serviceName: {type: String, required: true},
  servicePrice:{type: Number, required: true},
  startTime:{type:Date, required: true},
  endTime: {type: Date, required: true},
  status: {type: String, enum:['pending', 'confirmed', 'cancelled']},
  client:{type: Schema.Types.ObjectId, ref:'User', required: true},
  agent:{type: Schema.Types.ObjectId, ref:'User', required: true},
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);