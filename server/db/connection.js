const mongoose = require('mongoose');

const url=`mongodb+srv://chat_app_admin:Anjali123$@cluster0.8vfwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(()=>console.log('Connected to DB')).catch((e)=>console.log('Error',e))
