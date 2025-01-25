import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ['red', 'green', 'yellow'],
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 200,
  },
});

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);