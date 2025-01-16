const mongoose = require('mongoose');

const url=`mongodb+srv://chat_app_admin:1234Anjali@cluster0.8vfwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(()=>console.log('Connected to DB')).catch((e)=>console.log('Error',e))
