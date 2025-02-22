import TaskManager from "./components/tasks/TaskManager";
import ThemeToggle from "./components/ThemeToggle";
import { Button } from "./components/ui/button";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, signOutUser } = useAuth();
  return (
    <>
      <div className="">
       <div className="bg-accent">
       <nav className="flex items-center justify-between py-6 w-11/12 mx-auto ">
          <h1 className="font-bold text-3xl text-gray-800">Task <span>Manager</span></h1>
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL}
              className="w-12 h-12 rounded-full object-cover"
              alt={user?.displayName}
            />
            <div className="">
              <ThemeToggle />
            </div>
            <div onClick={() => signOutUser()}>
              <Button variant={"secondary"} >Log Out</Button>
            </div>
          </div>
        </nav>
       </div>
        <div className="my-10 w-11/12 mx-auto">
        <TaskManager />
        </div>
      </div>
    </>
  );
}

export default App;
