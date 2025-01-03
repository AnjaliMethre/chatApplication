import Button from "../../components/Button"
import Input from "../../components/Input"


const Form = () => {
  return (
    <div className="bg-white w-[400px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">Welcome</div>
        <div className="text-xl font-light mb-14" >Sign up now to get started </div>
        <Input label="Full name" name="name" placeholder="Enter your full name" className="mb-6"/>
        <Input label="Email address" name="email" placeholder="Enter your email" className="mb-6"/>
        <Input label="Password" type="password" name="password" placeholder="Enter your password" className="mb-14"/>
        <Button label="Sign up" className="w-1/2 mb-2"/>
        <div>Already have an account? <span className="text-primary cursor-pointer underline">Sign in</span></div>
    </div>
  )
}

export default Form
