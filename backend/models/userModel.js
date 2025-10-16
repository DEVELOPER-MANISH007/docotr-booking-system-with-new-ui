import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik01MC4zNDc0IDQ3LjM0N0M1My43NTY5IDQ3LjM0NyA1Ni41MjA5IDQ0LjU4MzEgNTYuNTIwOSA0MS4xNzM1QzU2LjUyMDkgMzcuNzY0IDUzLjc1NjkgMzUgNTAuMzQ3NCAzNUM0Ni45Mzc4IDM1IDQ0LjE3MzggMzcuNzY0IDQ0LjE3MzggNDEuMTczNUM0NC4xNzM4IDQ0LjU4MzEgNDYuOTM3OCA0Ny4zNDcgNTAuMzQ3NCA0Ny4zNDdaIiBmaWxsPSIjQUFBQUFBIi8+CjxwYXRoIG9wYWNpdHk9IjAuNSIgZD0iTTYyLjY5NDEgNTguOTIxOEM2Mi42OTQxIDYyLjc1NzUgNjIuNjk0MSA2NS44NjcgNTAuMzQ3IDY1Ljg2N0MzOCA2NS44NjcgMzggNjIuNzU3NSAzOCA1OC45MjE4QzM4IDU1LjA4NiA0My41MjggNTEuOTc2NiA1MC4zNDcgNTEuOTc2NkM1Ny4xNjYyIDUxLjk3NjYgNjIuNjk0MSA1NS4wODYgNjIuNjk0MSA1OC45MjE4WiIgZmlsbD0iI0FBQUFBQSIvPgo8L3N2Zz4K'},
    address:{type:Object,default:{line1:'',line2:''}},
    gender:{type:String,required:true,default:'Not Selected'},
    dob:{type:String,required:true,default:'Not Selected'},
    phone:{type:String,required:true,default:'0000000000'},

})



const userModel = mongoose.models.User || mongoose.model('User',userSchema)

export default userModel