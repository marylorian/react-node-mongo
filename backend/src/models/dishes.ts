import mongoose from 'mongoose'

import { commentSchema } from './comments'

export const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

export default mongoose.model("Dish", dishSchema)
