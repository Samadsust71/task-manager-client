
import AddTask from "./components/AddTask";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <>
      <h1>Task manager App</h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Tasks</TabsTrigger>
          <TabsTrigger value="password">Add Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AddTask/>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

    </>
  );
}

export default App;
