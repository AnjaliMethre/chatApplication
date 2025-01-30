import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"

const Form = ({
  isSignInPage=true,
}) => {
  const [data, setData]=useState({
    ...(!isSignInPage &&{
        fullName:''
    }),
    email:'',
    password:''

  })

 
  return (
    <div className="bg-white w-[400px] h-[550px] border shadow-lg rounded-lg flex flex-col justify-center items-center" >
      <div className="text-4xl font-extrabold ">welcome{isSignInPage && 'Back'}</div>
      <div className="text-xl font-light mb-10">{isSignInPage ? 'Sign in to get explored':'sign up to get started'}</div>
      <form className="flex flex-col items-center w-full" onSubmit={()=>console.log('Submitted')}>
      {!isSignInPage &&  <Input label="Full name" name="name" placeholder="Enter your full name" className="mb-6" value={data.fullName} onChange={(e)=>setData({...data, fullName:e.target.value})}/> }
      <Input label="Email address" type="email" name="email" placeholder="Enter your email" className="mb-6" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})}/>
      <Input label="Password" name="password" placeholder="Enter your password" className="mb-14" value={data.password} onChange={(e)=>setData({...data, email:e.target.value})}/>
      <Button label={isSignInPage ? 'Sign in':'Sign up'} type='submit' className="w-1/2 mb-2"/>
      </form>
      
      <div>{ isSignInPage ? "Did'nt have an account?":"Already have an account?"} <span className="text-primary cursor-pointer underline">{isSignInPage?'Sign up':'Sign in'}</span></div>
    </div>
  )
}

export default Form
