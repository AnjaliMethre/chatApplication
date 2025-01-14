
import Avatar from '../../assets/avatar.png'
import Input from '../../components/Input/index.js'

const Dashboard = () => {
  const contacts=[
    {
      name:'john',
      status:'Available',
      img:Avatar
    },

    {
      name:'Mary',
      status:'Available',
      img:Avatar
    },

    {
      name:'Alexander',
      status:'Available',
      img:Avatar
    },

    {
      name:'Adam',
      status:'Available',
      img:Avatar
    },

    {
      name:'Alex',
      status:'Available',
      img:Avatar
    },

    {
      name:'Larry',
      status:'Available',
      img:Avatar
    },
  ]

 
  return (
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary'>
        <div className='flex items-center my-8 mx-14'>
            <div className='border border-primary p-[2px] rounded-full'><img src={Avatar} width={75} height={75} /></div>
            <div className='ml-8'>
                <h3 className='text-2xl'>tut</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
        <hr/>
        <div className='mx-14 mt-10'>
          <div className='text-primary text-lg'>Messages</div>
          <div>
            {
              contacts.map(({name,status,img})=>{
                return(
                  <div className='flex  items-center py-8 border-b border-b-gray-300'>
                    <div className='cursor-pointer flex items-center'>
                    <div><img src={img} width={60} height={60}/></div>
                    <div className='ml-6'>
                      <h3 className='text-lg font-semibold'>{name}</h3>
                      <p className='text-sm font-light text-gray-600'>{status}</p>
                    </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className='w-[75%]  h-screen bg-white flex flex-col items-center'>
        <div className='w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14'>
          <div className='cursor-pointer'><img src={Avatar} width={60} height={60} /></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'>Alexander</h3>
            <p className='text-sm font-light text-gray-600'>online</p>
          </div>
          <div className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> 
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2"></path> 
          <path d="M15 5h6"></path> <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5"></path> </svg> 
          </div>
          
        </div>
          <div className='h-[50%] w-full overflow-scroll shadow-sm'>
            <div className='p-14'>
              <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tr-xl ml-auto p-4 text-white mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tr-xl ml-auto p-4 text-white mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tr-xl ml-auto p-4 text-white mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tr-xl ml-auto p-4 text-white mb-6'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              
            </div>
          </div>
          <div className='p-14 w-full flex items-center'>
            <Input placeholder='Type a message...' className='w-[75%]' inputClassName='p-4 border-0 shadow-md 
            rounded-full bg-light focus:ring-0 focus:border-0 outline-none'/>
            <div className='ml-4 p-4 cursor-pointer bg-light rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.5">
              <path d="M10 14l11 -11"></path> 
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path> </svg> 
            </div>
            <div className='ml-4 p-4 cursor-pointer bg-light rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path> <path d="M9 12h6"></path> 
              <path d="M12 9v6"></path> </svg> 
            </div>
          </div>
      </div>
      
      <div className='w-[25%]  h-screen bg-light'>

      </div>
    </div>
  )
}

export default Dashboard
