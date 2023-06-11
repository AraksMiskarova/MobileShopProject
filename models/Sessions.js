const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionsSchema = new Schema(
    {
        sid: {
            type: String,
            required: true,
        },
    },
    { strict: false }
);

module.exports = Partner = mongoose.model('sessions', SessionsSchema);
