import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
    genre: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export const CaseModel = mongoose.model("Case", caseSchema);
