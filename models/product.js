import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    frequency: { type: String },
    time: { type: String },
    repeat: { type: String },
});

export default mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);
