const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


// Connect DB
require('./db/connection');

// Import files
const Users = require('./models/Users');
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');

// Initialize app



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;



// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/api/register', async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
       
        if (!fullName || !email || !password) {
            return res.status(400).send('Please fill all required fields');
        }

        const isAlreadyExist = await Users.findOne({ email });
        if (isAlreadyExist) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new Users({ fullName, email, password: hashedPassword });
        await newUser.save();

        return res.status(200).send('User registered successfully');
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/api/login', async (req, res,next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please fill all required fields');
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send('User email or password is incorrect');
        }

        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
            return res.status(400).send('User email or password is incorrect');
        }

        const payload = {
            userId: user._id,
            email: user.email,
        };
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
            if (err) {
                console.error('Error generating token:', err);
                return res.status(500).send('Token generation failed');
            }

            await Users.updateOne({ _id: user._id }, { $set: { token } });

            return res.status(200).json({
                user: {
                    id:user._id,
                    email: user.email,
                    fullName: user.fullName,
                    
                    
                },
                token,
            });
        });
    } catch (error) {
       console.error('Error during login:', error);
       return res.status(500).send('Internal Server Error');
    }
});



app.post('/api/conversation',async (req, res)=>{
    try{
        const{senderId, receiverId}=req.body;
        const newConversation=new Conversations({ members:[senderId,receiverId]});
        await newConversation.save();
        res.status(200).send('Conversation created Successfully');
    }
    catch(error){
        console.log(error,'Error');
    }
})


app.get('/api/conversations/:userId', async (req, res)=>{
    try{
        const userId=req.params.userId;
        const conversations=await Conversations.find({members:{$in:[userId]}});
        const conversationUserData=Promise.all(conversations.map(async (conversation)=>{
            const receiverId=conversation.members.find((member)=>member !== userId);
            const user = await Users.findById(receiverId);
            return {user: {receiverId: user._id, email:user.email, fullName:user.fullName}, conversationId: conversation._id}
            
        }))
        
        res.status(200).json(await conversationUserData);
    
    }
    catch(error){
        console.log(error,'Error')
    }
})



app.post('/api/message',async(req,res)=>{
    try{
        const {conversationId, senderId, message, receiverId}=req.body;
        if(!senderId || !message) return res.status(400).send('please fill all required fields')
        if(!conversationId && receiverId){
            const newConversation=new Conversations({ members: [senderId, receiverId]});
            await newConversation.save();
            const newMessage=new Messages({ conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        }
        else if(!conversationId && !receiverId){
            return res.status(400).send('Please fill all required fields')
        }
        const newMessage=new Messages({conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }
    catch(error){
        console.log(error, 'Error')
    }
})


app.get('/api/message/:conversationId', async (req,res)=>{
    try{
        const conversationId = req.params.conversationId;
        if(conversationId === 'new') return res.status(200).json([]);
         const messages=await Messages.find({conversationId});
         const messageUserData=Promise.all(messages.map(async(message)=>{
            const user=await Users.findById(message.senderId);
        
            return {user: { id: user._id, email:user.email, fullName:user.fullName}, message:message.message}
         }));
     res.status(200).json(await messageUserData);
    
    }
    catch(error){
        console.log('Error',error)
    }
})


app.get('/api/users', async (req, res)=>{
    try{
        const users=await Users.find();
        const usersData=Promise.all(users.map(async (user)=>{
           return {user:{email:user.email, fullName:user.fullName }, userId:user._id }
           
        }))
        res.status(200).json(await usersData);
    
    }
    catch(error){
        console.log('Error',error)
    }
})




app.listen(port, ()=>{
    console.log('listening on port ' +port);
})