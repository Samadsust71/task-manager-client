import { ImSpinner9 } from "react-icons/im";


const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-background ">
      
      <ImSpinner9 className="text-8xl font-bold animate-spin text-accent transition-all duration-100 text-center" />
      
    </div>
  )
}

export default Loading
