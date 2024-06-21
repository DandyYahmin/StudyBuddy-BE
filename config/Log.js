import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/log", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const log = mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

export default mongoose.model('activity_log', log);

