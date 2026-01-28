const app = require('./src/app');
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb+srv://vaidikGadhiya:Y5Bmhwa8h5y0xXiX@cluster0.nvdqahr.mongodb.net/day-6")
    .then(()=>{
        console.log("Connected to Database");
    })
}
connectDB();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});