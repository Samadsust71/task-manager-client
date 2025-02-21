import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AddTask = () => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation

    const validationErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required.";
    if (title.length > 50) validationErrors.title = "Title cannot exceed 50 characters.";
    if (description.length > 200) validationErrors.description = "Description cannot exceed 200 characters.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const taskData = {
      title,
      description,
      timestamp: new Date().toISOString(),
      category: "To-Do",
    };

    try {
      await axiosPublic.post("/tasks", taskData);
      toast.success("Task added successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 shadow-md">
      <CardHeader className="text-xl font-semibold text-center">Add Task</CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title (max 50 characters)</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description (max 200 characters)</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddTask;
