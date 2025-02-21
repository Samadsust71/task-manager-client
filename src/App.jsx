import TaskManager from "./components/tasks/TaskManager";
import ThemeToggle from "./components/ThemeToggle";
import { Button } from "./components/ui/button";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, signOutUser } = useAuth();
  return (
    <>
      <div className="w-11/12 mx-auto">
        <nav className="flex items-center justify-between py-6">
          <h1 className="font-bold text-2xl">Task Manager</h1>
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
              <Button>Log Out</Button>
            </div>
          </div>
        </nav>
        <div className="my-10">
        <TaskManager />
        </div>
      </div>
    </>
  );
}

export default App;
