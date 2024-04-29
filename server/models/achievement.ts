import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AchievementSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        picture: {type: String, default: ""},
        progress: {type: Number, default: 0}
    },
    { timestamps: true },
)

export const User = mongoose.model('User', AchievementSchema)