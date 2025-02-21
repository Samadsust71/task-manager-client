
import TaskManager from "./components/tasks/TaskManager";
import { Button } from "./components/ui/button";
import useAuth from "./hooks/useAuth";



function App() {
  const {user,signOutUser} = useAuth()
  return (
    <>
      <div className="w-11/12 mx-auto">
       <nav className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Task Manager</h1>
        <div className="flex items-center gap-2">
          <img src={user?.photoURL} className="w-12 h-12 rounded-full object-cover" alt={user?.displayName} />
          <div onClick = {()=>signOutUser()}>
          <Button>Log Out</Button>
          </div>
        </div>
       </nav>
      <TaskManager/>
      </div>
      
      
    </>
  );
}

export default App;
