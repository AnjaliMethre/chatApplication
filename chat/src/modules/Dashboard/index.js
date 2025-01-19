
import { useEffect, useState } from 'react'
import Avatar from '../../assets/avatar.png'
import Input from '../../components/Input/index.js'

const Dashboard = () => {
  
  
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversations, setConversations]=useState([])
  const [messages, setMessages] = useState({})
  const [message, setMessage] = useState('')
  console.log('user :>>', user);
  console.log('conversations :>> ', conversations);
  console.log('messages :>> ', messages);


  useEffect(()=>{
    const loggedInUser=JSON.parse(localStorage.getItem('user:detail'))
    const fetchConversations = async()=>{
      const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      });
      const resData = await res.json()
      setConversations(resData)
    }
    fetchConversations()
  },[])

  


  const fetchMessages = async(conversationId, user)=>{
    const res = await fetch(`http://localhost:8000/api/message/${conversationId}`,{
      method:'GET',
      headers:{
        'content-Type':'application/json',
      }
     
    });
    const resData=await res.json()
    console.log('resData :>>',resData);
    setMessages({messages: resData, receiver: user, conversationId})
  }
    const sendMessage = async(e)=>{
      const res=await fetch(`http://localhost:8000/api/message`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        conversationId:messages?.conversationId,
        senderId:user?.id,
        message,
        receiverId:messages?.receiver?.receiverId
      })
    });
  
  setMessage('')
  }
  return (
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary'>
        <div className='flex items-center my-8 mx-14'>
            <div>
              <img src={Avatar} width={75} height={75} className='border border-primary p-[2px] rounded-full'/></div>
            <div className='ml-8'>
                <h3 className='text-2xl'>{user?.fullName}</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
        <hr/>
        <div className='mx-14 mt-10'>
  <div className='text-primary text-lg'>Messages</div>
  <div>
    {
      conversations.length > 0
        ? [...new Map(conversations.map(item => [item.user.id, item])).values()]
            .map(({ conversationId, user }) => (
              <div
                key={conversationId}
                className='flex items-center py-8 border-b border-b-gray-300'
              >
                <div
                  className='cursor-pointer flex items-center'
                  onClick={() => fetchMessages(conversationId, user)}
                >
                  <div>
                    <img
                      src={Avatar}
                      className='w-[60px] h-[60px] rounded-full p-[2px] border border-primary'
                    />
                  </div>
                  <div className='ml-6'>
                    <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                    <p className='text-sm font-light text-gray-600'>
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            ))
        : <div className='text-center text-lg font-semibold mt-24'>No conversations</div>
    }
  </div>
</div>

      </div>
      <div className='w-[75%]  h-screen bg-white flex flex-col items-center'>
       {
        messages?.receiver?.fullName && 
        <div className='w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 py-2'>
          <div className='cursor-pointer'><img src={Avatar} width={60} height={60} 
           className='rounded-full'/></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'>{messages?.receiver?.fullName}</h3>
            <p className='text-sm font-light text-gray-600'>{messages?.receiver?.email}</p>
          </div>
          <div className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outdating" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
          <path d="M15 5h6"></path> 
          <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5"></path>
          </svg> 
          </div>
          
        </div>
        }
          <div className='h-[75%] w-full overflow-scroll shadow-sm'>
            <div className='p-14'>
             
              {
                messages?.messages?.length > 0 ?
                messages.messages.map(({message, user : { id } = {} }) => {
                  return(
                    <div className={`max-w-[40%] rounded-b-xl  p-4 mb-6 ${ id === user?.id ? 'bg-primary  text-white rounded-tr-xl ml-auto':'bg-secondary rounded-tr-xl' }`}>
                     {message}
                    </div>
                  )
                  
                }): <div className='text-center text-lg font-semibold my-24'>No 
                Messages or No  concersation selected</div>
              }
              
            </div>
          </div>
          {
            messages?.receiver?.fullName &&
            <div className='p-14 w-full flex items-center'>
            <Input placeholder='Type a message...' value={message} onChange={(e)=>setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md 
            rounded-full bg-light focus:ring-0 focus:border-0 outline-none'/>
            <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={()=>sendMessage()}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M10 14l11 -11" fill="none" /> 
              <line x1="10" y1="14" x2="21" y2="3" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg> 
            </div>
            <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full rounded-full ${!message && 'pointer-events-none'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" fill="none" /> 
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12h6"></path> 
              <path d="M12 9v6"></path> 
              </svg> 
            </div>
          </div>
      
          }
        </div>
      
      <div className='w-[25%]  h-screen bg-light'>

      </div>
    </div>
  )
}
export default Dashboard
