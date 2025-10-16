import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error:', err)
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    } catch (error) {
        console.log('Database connection failed:', error.message)
        process.exit(1)
    }
}

export default connectDB