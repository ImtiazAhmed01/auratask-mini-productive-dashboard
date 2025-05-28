// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [goals, setGoals] = useState([]);
//     const [quote, setQuote] = useState({ text: '', author: '' });
//     const [taskForm, setTaskForm] = useState({ title: '', description: '', id: null });
//     const [goalForm, setGoalForm] = useState({ title: '', description: '', type: 'weekly', id: null });
//     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//     const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     const API_URL = 'http://localhost:5000';
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     // Fetch Tasks
//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/tasks`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(res.data);
//         } catch (error) {
//             toast.error('Failed to fetch tasks');
//         }
//     };

//     // Fetch Goals
//     const fetchGoals = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/goals`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setGoals(res.data);
//         } catch (error) {
//             toast.error('Failed to fetch goals');
//         }
//     };

//     // Fetch Quote
//     const fetchQuote = async () => {
//         try {
//             const res = await axios.get('https://api.quotable.io/random');
//             setQuote({ text: res.data.content, author: res.data.author });
//         } catch (error) {
//             console.error('Failed to fetch quote:', error);
//             setQuote({ text: 'Stay focused and keep moving forward!', author: 'Unknown' });
//         }
//     };

//     useEffect(() => {
//         if (!token) {
//             toast.error('Please log in to access the dashboard');
//             navigate('/login');
//             return;
//         }

//         const loadData = async () => {
//             setIsLoading(true);
//             await Promise.all([fetchTasks(), fetchGoals(), fetchQuote()]);
//             setIsLoading(false);
//         };

//         loadData();
//     }, [token, navigate]);

//     // Handle Task Form Submission
//     const handleTaskSubmit = async (e) => {
//         e.preventDefault();
//         if (!taskForm.title.trim()) {
//             toast.error('Task title is required');
//             return;
//         }
//         try {
//             if (taskForm.id) {
//                 // Update Task
//                 const res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, {
//                     title: taskForm.title,
//                     description: taskForm.description,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                 toast.success('Task updated');
//             } else {
//                 // Create Task
//                 const res = await axios.post(`${API_URL}/tasks`, {
//                     title: taskForm.title,
//                     description: taskForm.description,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks([...tasks, res.data]);
//                 toast.success('Task created');
//             }
//             setTaskForm({ title: '', description: '', id: null });
//             setIsTaskModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save task');
//         }
//     };

//     // Handle Goal Form Submission
//     const handleGoalSubmit = async (e) => {
//         e.preventDefault();
//         if (!goalForm.title.trim()) {
//             toast.error('Goal title is required');
//             return;
//         }
//         try {
//             if (goalForm.id) {
//                 // Update Goal
//                 const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, {
//                     title: goalForm.title,
//                     description: goalForm.description,
//                     type: goalForm.type,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
//                 toast.success('Goal updated');
//             } else {
//                 // Create Goal
//                 const res = await axios.post(`${API_URL}/goals`, {
//                     title: goalForm.title,
//                     description: goalForm.description,
//                     type: goalForm.type,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals([...goals, res.data]);
//                 toast.success('Goal created');
//             }
//             setGoalForm({ title: '', description: '', type: 'weekly', id: null });
//             setIsGoalModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save goal');
//         }
//     };

//     // Mark Task as Complete
//     const markTaskComplete = async (taskId, completed) => {
//         try {
//             const res = await axios.put(`${API_URL}/tasks/${taskId}`, {
//                 completed: !completed,
//             }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(tasks.map(t => t._id === taskId ? res.data : t));
//             toast.success(`Task marked as ${!completed ? 'complete' : 'incomplete'}`);
//         } catch (error) {
//             toast.error('Failed to update task status');
//         }
//     };

//     // Delete Task
//     const deleteTask = async (taskId) => {
//         try {
//             await axios.delete(`${API_URL}/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(tasks.filter(t => t._id !== taskId));
//             toast.success('Task deleted');
//         } catch (error) {
//             toast.error('Failed to delete task');
//         }
//     };

//     // Delete Goal
//     const deleteGoal = async (goalId) => {
//         try {
//             await axios.delete(`${API_URL}/goals/${goalId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setGoals(goals.filter(g => g._id !== goalId));
//             toast.success('Goal deleted');
//         } catch (error) {
//             toast.error('Failed to delete goal');
//         }
//     };

//     // Open Task Edit Form
//     const editTask = (task) => {
//         setTaskForm({ title: task.title, description: task.description || '', id: task._id });
//         setIsTaskModalOpen(true);
//     };

//     // Open Goal Edit Form
//     const editGoal = (goal) => {
//         setGoalForm({ title: goal.title, description: goal.description || '', type: goal.type, id: goal._id });
//         setIsGoalModalOpen(true);
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <p className="text-xl">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <h1 className="text-3xl font-bold text-center mb-6">Productivity Dashboard</h1>

//             {/* Motivational Quote */}
//             <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//                 <p className="text-lg italic">"{quote.text}"</p>
//                 <p className="text-sm text-gray-600">— {quote.author}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Daily Task List */}
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-semibold">Daily Tasks</h2>
//                         <button
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             onClick={() => {
//                                 setTaskForm({ title: '', description: '', id: null });
//                                 setIsTaskModalOpen(true);
//                             }}
//                         >
//                             Add Task
//                         </button>
//                     </div>
//                     {tasks.length === 0 ? (
//                         <p className="text-gray-500">No tasks for today.</p>
//                     ) : (
//                         <ul>
//                             {tasks.map(task => (
//                                 <li key={task._id} className="flex items-center justify-between p-2 border-b">
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={task.completed}
//                                             onChange={() => markTaskComplete(task._id, task.completed)}
//                                             className="mr-2"
//                                         />
//                                         <div>
//                                             <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
//                                                 {task.title}
//                                             </p>
//                                             {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <button
//                                             className="text-blue-500 mr-2"
//                                             onClick={() => editTask(task)}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             className="text-red-500"
//                                             onClick={() => deleteTask(task._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>

//                 {/* Goals Section */}
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-semibold">Goals</h2>
//                         <button
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             onClick={() => {
//                                 setGoalForm({ title: '', description: '', type: 'weekly', id: null });
//                                 setIsGoalModalOpen(true);
//                             }}
//                         >
//                             Add Goal
//                         </button>
//                     </div>
//                     {goals.length === 0 ? (
//                         <p className="text-gray-500">No goals set.</p>
//                     ) : (
//                         <ul>
//                             {goals.map(goal => (
//                                 <li key={goal._id} className="flex items-center justify-between p-2 border-b">
//                                     <div>
//                                         <p className="font-medium">{goal.title}</p>
//                                         {goal.description && <p className="text-sm text-gray-600">{goal.description}</p>}
//                                         <p className="text-sm text-gray-500 capitalize">{goal.type} Goal</p>
//                                     </div>
//                                     <div>
//                                         <button
//                                             className="text-blue-500 mr-2"
//                                             onClick={() => editGoal(goal)}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             className="text-red-500"
//                                             onClick={() => deleteGoal(goal._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>

//             {/* Task Modal */}
//             {isTaskModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h3 className="text-lg font-semibold mb-4">{taskForm.id ? 'Edit Task' : 'Add Task'}</h3>
//                         <form onSubmit={handleTaskSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     className="w-full border rounded p-2"
//                                     value={taskForm.title}
//                                     onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Description</label>
//                                 <textarea
//                                     className="w-full border rounded p-2"
//                                     value={taskForm.description}
//                                     onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <button
//                                     type="button"
//                                     className="mr-2 text-gray-500"
//                                     onClick={() => setIsTaskModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Goal Modal */}
//             {isGoalModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h3 className="text-lg font-semibold mb-4">{goalForm.id ? 'Edit Goal' : 'Add Goal'}</h3>
//                         <form onSubmit={handleGoalSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     className="w-full border rounded p-2"
//                                     value={goalForm.title}
//                                     onChange={e => setGoalForm({ ...goalForm, title: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Description</label>
//                                 <textarea
//                                     className="w-full border rounded p-2"
//                                     value={goalForm.description}
//                                     onChange={e => setGoalForm({ ...goalForm, description: e.target.value })}
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Type</label>
//                                 <select
//                                     className="w-full border rounded p-2"
//                                     value={goalForm.type}
//                                     onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
//                                 >
//                                     <option value="weekly">Weekly</option>
//                                     <option value="monthly">Monthly</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-end">
//                                 <button
//                                     type="button"
//                                     className="mr-2 text-gray-500"
//                                     onClick={() => setIsGoalModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </div>
//     );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { motion, AnimatePresence } from 'framer-motion';
// import Quote from './Quote'; // Import Quote component

// const Dashboard = () => {
//     // State declarations
//     const [tasks, setTasks] = useState([]);
//     const [goals, setGoals] = useState([]);
//     const [taskForm, setTaskForm] = useState({ title: '', description: '', id: null });
//     const [goalForm, setGoalForm] = useState({ title: '', description: '', type: 'weekly', id: null });
//     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//     const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     // Constants
//     const API_URL = 'http://localhost:5000';
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     // Animation Variants
//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
//         exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
//     };

//     const goalVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
//         exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
//     };

//     const modalVariants = {
//         hidden: { opacity: 0, scale: 0.8, y: 100 },
//         visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
//         exit: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.2 } },
//     };

//     const buttonVariants = {
//         hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
//         tap: { scale: 0.95 },
//     };

//     const spinnerVariants = {
//         animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: 'linear' } },
//     };

//     // Fetch Tasks
//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/tasks`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(res.data);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to fetch tasks');
//         }
//     };

//     // Fetch Goals
//     const fetchGoals = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/goals`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setGoals(res.data);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to fetch goals');
//         }
//     };

//     // Handle Drag-and-Drop
//     const handleDragEnd = async (event) => {
//         const { active, over } = event;
//         if (!over || active.id === over.id) return;

//         const oldIndex = tasks.findIndex(task => task._id === active.id);
//         const newIndex = tasks.findIndex(task => task._id === over.id);
//         const reorderedTasks = [...tasks];
//         const [movedTask] = reorderedTasks.splice(oldIndex, 1);
//         reorderedTasks.splice(newIndex, 0, movedTask);

//         // Update local state optimistically
//         setTasks(reorderedTasks);

//         // Prepare order updates
//         const updatedTasks = reorderedTasks.map((task, index) => ({
//             id: task._id,
//             order: index,
//         }));

//         try {
//             await axios.post(`${API_URL}/tasks/reorder`, { tasks: updatedTasks }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             toast.success('Task order saved');
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save task order');
//             await fetchTasks();
//         }
//     };

//     // Load data on mount
//     useEffect(() => {
//         if (!token) {
//             toast.error('Please log in to access the dashboard');
//             navigate('/login');
//             return;
//         }

//         const loadData = async () => {
//             setIsLoading(true);
//             await Promise.all([fetchTasks(), fetchGoals()]);
//             setIsLoading(false);
//         };

//         loadData();
//     }, [token, navigate]);

//     // Handle Task Form Submission
//     const handleTaskSubmit = async (e) => {
//         e.preventDefault();
//         if (!taskForm.title.trim()) {
//             toast.error('Task title is required');
//             return;
//         }
//         try {
//             if (taskForm.id) {
//                 // Update Task
//                 const res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, {
//                     title: taskForm.title,
//                     description: taskForm.description,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                 toast.success('Task updated');
//             } else {
//                 // Create Task
//                 const res = await axios.post(`${API_URL}/tasks`, {
//                     title: taskForm.title,
//                     description: taskForm.description,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks([...tasks, res.data]);
//                 toast.success('Task created');
//             }
//             setTaskForm({ title: '', description: '', id: null });
//             setIsTaskModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save task');
//         }
//     };

//     // Handle Goal Form Submission
//     const handleGoalSubmit = async (e) => {
//         e.preventDefault();
//         if (!goalForm.title.trim()) {
//             toast.error('Goal title is required');
//             return;
//         }
//         try {
//             if (goalForm.id) {
//                 // Update Goal
//                 const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, {
//                     title: goalForm.title,
//                     description: goalForm.description,
//                     type: goalForm.type,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
//                 toast.success('Goal updated');
//             } else {
//                 // Create Goal
//                 const res = await axios.post(`${API_URL}/goals`, {
//                     title: goalForm.title,
//                     description: goalForm.description,
//                     type: goalForm.type,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals([...goals, res.data]);
//                 toast.success('Goal created');
//             }
//             setGoalForm({ title: '', description: '', type: 'weekly', id: null });
//             setIsGoalModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save goal');
//         }
//     };

//     // Mark Task as Complete
//     const markTaskComplete = async (taskId, completed) => {
//         try {
//             const res = await axios.put(`${API_URL}/tasks/${taskId}`, {
//                 completed: !completed,
//             }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(tasks.map(t => t._id === taskId ? res.data : t));
//             toast.success(`Task marked as ${!completed ? 'complete' : 'incomplete'}`);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to update task status');
//         }
//     };

//     // Delete Task
//     const deleteTask = async (taskId) => {
//         try {
//             await axios.delete(`${API_URL}/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTasks(tasks.filter(t => t._id !== taskId));
//             toast.success('Task deleted');
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to delete task');
//         }
//     };

//     // Delete Goal
//     const deleteGoal = async (goalId) => {
//         try {
//             await axios.delete(`${API_URL}/goals/${goalId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setGoals(goals.filter(g => g._id !== goalId));
//             toast.success('Goal deleted');
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to delete goal');
//         }
//     };

//     // Open Task Edit Form
//     const editTask = (task) => {
//         setTaskForm({ title: task.title, description: task.description || '', id: task._id });
//         setIsTaskModalOpen(true);
//     };

//     // Open Goal Edit Form
//     const editGoal = (goal) => {
//         setGoalForm({ title: goal.title, description: goal.description || '', type: goal.type, id: goal._id });
//         setIsGoalModalOpen(true);
//     };

//     // Sortable Task Item Component
//     const SortableTask = ({ task, index }) => {
//         const {
//             attributes,
//             listeners,
//             setNodeRef,
//             transform,
//             transition,
//             isDragging,
//         } = useSortable({ id: task._id });

//         const style = {
//             transform: CSS.Transform.toString(transform),
//             transition,
//         };

//         return (
//             <motion.li
//                 ref={setNodeRef}
//                 style={style}
//                 {...attributes}
//                 {...listeners}
//                 variants={itemVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 layout
//                 className={`flex items-center justify-between p-2 border-b bg-gray-50 hover:bg-gray-100 ${isDragging ? 'shadow-lg scale-105' : ''}`}
//                 transition={{ type: 'spring', stiffness: 100 }}
//             >
//                 <div className="flex items-center">
//                     <motion.input
//                         type="checkbox"
//                         checked={task.completed}
//                         onChange={() => markTaskComplete(task._id, task.completed)}
//                         className="mr-2"
//                         animate={{ scale: task.completed ? 1.2 : 1 }}
//                         transition={{ duration: 0.2 }}
//                     />
//                     <div>
//                         <motion.p
//                             className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}
//                             animate={{ opacity: task.completed ? 0.6 : 1 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             {task.title}
//                         </motion.p>
//                         {task.description && (
//                             <p className="text-sm text-gray-600">{task.description}</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex space-x-2">
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover="hover"
//                         whileTap="tap"
//                         className="text-blue-500"
//                         onClick={() => editTask(task)}
//                     >
//                         Edit
//                     </motion.button>
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover="hover"
//                         whileTap="tap"
//                         className="text-red-500"
//                         onClick={() => deleteTask(task._id)}
//                     >
//                         Delete
//                     </motion.button>
//                 </div>
//             </motion.li>
//         );
//     };

//     // Loading state
//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <motion.div
//                     variants={spinnerVariants}
//                     animate="animate"
//                     className="w-12 h-12 border-4 border-t-green-500 border-gray-200 rounded-full"
//                 />
//             </div>
//         );
//     }

//     // Main render
//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold text-center mb-6"
//             >
//                 Productivity Dashboard
//             </motion.h1>

//             {/* Motivational Quote */}
//             <Quote />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Daily Tasks */}
//                 <div className="bg-white p-4 rounded-md shadow-md">
//                     <div className="flex justify-between mb-4">
//                         <motion.h2
//                             whileHover={{ scale: 1.05 }}
//                             className="text-xl font-semibold"
//                         >
//                             Daily Tasks
//                         </motion.h2>
//                         <motion.button
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             onClick={() => {
//                                 setTaskForm({ title: '', description: '', id: null });
//                                 setIsTaskModalOpen(true);
//                             }}
//                         >
//                             Add Task
//                         </motion.button>
//                     </div>
//                     {tasks.length === 0 ? (
//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="text-gray-500"
//                         >
//                             No tasks for today.
//                         </motion.p>
//                     ) : (
//                         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                             <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
//                                 <ul>
//                                     <AnimatePresence>
//                                         {tasks.map((task, index) => (
//                                             <SortableTask key={task._id} task={task} index={index} />
//                                         ))}
//                                     </AnimatePresence>
//                                 </ul>
//                             </SortableContext>
//                         </DndContext>
//                     )}
//                 </div>

//                 {/* Goals Section */}
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <div className="flex justify-between items-center mb-4">
//                         <motion.h2
//                             whileHover={{ scale: 1.05 }}
//                             className="text-xl font-semibold"
//                         >
//                             Goals
//                         </motion.h2>
//                         <motion.button
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             onClick={() => {
//                                 setGoalForm({ title: '', description: '', type: 'weekly', id: null });
//                                 setIsGoalModalOpen(true);
//                             }}
//                         >
//                             Add Goal
//                         </motion.button>
//                     </div>
//                     {goals.length === 0 ? (
//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="text-gray-500"
//                         >
//                             No goals set.
//                         </motion.p>
//                     ) : (
//                         <ul>
//                             <AnimatePresence>
//                                 {goals.map((goal, index) => (
//                                     <motion.li
//                                         key={goal._id}
//                                         variants={goalVariants}
//                                         initial="hidden"
//                                         animate="visible"
//                                         exit="exit"
//                                         transition={{ delay: index * 0.1 }}
//                                         className="flex items-center justify-between p-2 border-b hover:bg-gray-50"
//                                     >
//                                         <div>
//                                             <p className="font-medium">{goal.title}</p>
//                                             {goal.description && <p className="text-sm text-gray-600">{goal.description}</p>}
//                                             <p className="text-sm text-gray-500 capitalize">{goal.type} Goal</p>
//                                         </div>
//                                         <div className="flex space-x-2">
//                                             <motion.button
//                                                 variants={buttonVariants}
//                                                 whileHover="hover"
//                                                 whileTap="tap"
//                                                 className="text-blue-500"
//                                                 onClick={() => editGoal(goal)}
//                                             >
//                                                 Edit
//                                             </motion.button>
//                                             <motion.button
//                                                 variants={buttonVariants}
//                                                 whileHover="hover"
//                                                 whileTap="tap"
//                                                 className="text-red-500"
//                                                 onClick={() => deleteGoal(goal._id)}
//                                             >
//                                                 Delete
//                                             </motion.button>
//                                         </div>
//                                     </motion.li>
//                                 ))}
//                             </AnimatePresence>
//                         </ul>
//                     )}
//                 </div>
//             </div>

//             {/* Task Modal */}
//             <AnimatePresence>
//                 {isTaskModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className="bg-white p-6 rounded-lg w-full max-w-md"
//                         >
//                             <h3 className="text-lg font-semibold mb-4">{taskForm.id ? 'Edit Task' : 'Add Task'}</h3>
//                             <form onSubmit={handleTaskSubmit}>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Title</label>
//                                     <motion.input
//                                         type="text"
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.title}
//                                         onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <motion.textarea
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.description}
//                                         onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-500"
//                                         onClick={() => setIsTaskModalOpen(false)}
//                                     >
//                                         Cancel
//                                     </motion.button>
//                                     <motion.button
//                                         type="submit"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                     >
//                                         Save
//                                     </motion.button>
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Goal Modal */}
//             <AnimatePresence>
//                 {isGoalModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className="bg-white p-6 rounded-lg w-full max-w-md"
//                         >
//                             <h3 className="text-lg font-semibold mb-4">{goalForm.id ? 'Edit Goal' : 'Add Goal'}</h3>
//                             <form onSubmit={handleGoalSubmit}>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Title</label>
//                                     <motion.input
//                                         type="text"
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.title}
//                                         onChange={e => setGoalForm({ ...goalForm, title: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <motion.textarea
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.description}
//                                         onChange={e => setGoalForm({ ...taskForm, description: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Type</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.type}
//                                         onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="weekly">Weekly</option>
//                                         <option value="monthly">Monthly</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-500"
//                                         onClick={() => setIsGoalModalOpen(false)}
//                                     >
//                                         Cancel
//                                     </motion.button>
//                                     <motion.button
//                                         type="submit"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                     >
//                                         Save
//                                     </motion.button>
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <ToastContainer />
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import Quote from './Quote';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);
    const [taskForm, setTaskForm] = useState({
        title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null
    });
    const [goalForm, setGoalForm] = useState({
        title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null
    });
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = 'http://localhost:5000';
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Animation Variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
    };

    const goalVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
        exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 100 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
        exit: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.2 } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
        tap: { scale: 0.95 },
    };

    const spinnerVariants = {
        animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: 'linear' } },
    };

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${API_URL}/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to fetch tasks');
        }
    };

    // Fetch Goals
    const fetchGoals = async () => {
        try {
            const res = await axios.get(`${API_URL}/goals`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(res.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to fetch goals');
        }
    };

    // Handle Drag-and-Drop
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceStatus = tasks.find(t => t._id === active.id).status;
        const destStatus = tasks.find(t => t._id === over.id).status;

        let reorderedTasks = [...tasks];
        const oldIndex = tasks.findIndex(t => t._id === active.id);
        const newIndex = tasks.findIndex(t => t._id === over.id);
        const [movedTask] = reorderedTasks.splice(oldIndex, 1);
        movedTask.status = destStatus; // Update status if moved to different column
        reorderedTasks.splice(newIndex, 0, movedTask);

        setTasks(reorderedTasks);

        const updatedTasks = reorderedTasks.map((t, index) => ({
            id: t._id,
            order: index,
            status: t.status,
        }));

        try {
            await axios.post(`${API_URL}/tasks/reorder`, { tasks: updatedTasks }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Task order saved');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save task order');
            await fetchTasks();
        }
    };

    // Load data on mount
    useEffect(() => {
        if (!token) {
            toast.error('Please log in to access the dashboard');
            navigate('/login');
            return;
        }

        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([fetchTasks(), fetchGoals()]);
            setIsLoading(false);
        };

        loadData();
    }, [token, navigate]);

    // Handle Task Form Submission
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        if (!taskForm.title.trim() || !taskForm.status) {
            toast.error('Task title and status are required');
            return;
        }
        if (!token) {
            toast.error('Please log in to continue');
            navigate('/login');
            return;
        }
        try {
            const taskData = {
                title: taskForm.title,
                description: taskForm.description,
                status: taskForm.status,
                dueDate: taskForm.dueDate || null,
                priority: taskForm.priority || null,
            };
            let res;
            if (taskForm.id) {
                res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
                toast.success('Task updated');
            } else {
                res = await axios.post(`${API_URL}/tasks`, taskData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks([...tasks, res.data]);
                toast.success('Task created');
            }
            setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
            setIsTaskModalOpen(false);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const refreshRes = await axios.post(`${API_URL}/refresh`, {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    localStorage.setItem('token', refreshRes.data.token);
                    const taskData = {
                        title: taskForm.title,
                        description: taskForm.description,
                        status: taskForm.status,
                        dueDate: taskForm.dueDate || null,
                        priority: taskForm.priority || null,
                    };
                    let res;
                    if (taskForm.id) {
                        res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
                            headers: { Authorization: `Bearer ${refreshRes.data.token}` },
                        });
                        setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
                    } else {
                        res = await axios.post(`${API_URL}/tasks`, taskData, {
                            headers: { Authorization: `Bearer ${refreshRes.data.token}` },
                        });
                        setTasks([...tasks, res.data]);
                    }
                    toast.success(taskForm.id ? 'Task updated' : 'Task created');
                    setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
                    setIsTaskModalOpen(false);
                } catch (refreshError) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } else {
                toast.error(error.response?.data?.error || 'Failed to save task');
            }
        }
    };

    // Handle Goal Form Submission
    const handleGoalSubmit = async (e) => {
        e.preventDefault();
        if (!goalForm.title.trim() || !goalForm.type || !goalForm.status) {
            toast.error('Goal title, type, and status are required');
            return;
        }
        try {
            const goalData = {
                title: goalForm.title,
                description: goalForm.description,
                type: goalForm.type,
                targetDate: goalForm.targetDate || null,
                status: goalForm.status,
            };
            if (goalForm.id) {
                const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, goalData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
                toast.success('Goal updated');
            } else {
                const res = await axios.post(`${API_URL}/goals`, goalData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGoals([...goals, res.data]);
                toast.success('Goal created');
            }
            setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
            setIsGoalModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save goal');
        }
    };

    // Delete Task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter(t => t._id !== taskId));
            toast.success('Task deleted');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete task');
        }
    };

    // Delete Goal
    const deleteGoal = async (goalId) => {
        try {
            await axios.delete(`${API_URL}/goals/${goalId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(goals.filter(g => g._id !== goalId));
            toast.success('Goal deleted');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete goal');
        }
    };

    // Open Task Edit Form
    const editTask = (task) => {
        setTaskForm({
            title: task.title,
            description: task.description || '',
            status: task.status,
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
            priority: task.priority || 'Medium',
            id: task._id,
        });
        setIsTaskModalOpen(true);
    };

    // Open Goal Edit Form
    const editGoal = (goal) => {
        setGoalForm({
            title: goal.title,
            description: goal.description || '',
            type: goal.type,
            targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : '',
            status: goal.status,
            id: goal._id,
        });
        setIsGoalModalOpen(true);
    };

    // Sortable Task Item Component
    const SortableTask = ({ task, index }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id: task._id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        // Stop event propagation for button clicks
        const handleButtonClick = (e, callback) => {
            e.stopPropagation(); // Prevent click from bubbling to parent
            callback();
        };

        return (
            <li
                ref={setNodeRef}
                style={style}
                className={`flex items-center justify-between p-2 border-b bg-[#C8F7DC] hover:bg-gray-100 ${isDragging ? 'shadow-lg scale-105' : ''
                    }`}
            >
                <div className="flex items-center w-full">
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab mr-2 text-gray-500"
                        style={{ touchAction: 'none' }} // Improve mobile drag behavior
                    >
                        ☰ {/* Drag handle icon */}
                    </div>
                    <div className="flex-grow">
                        <p
                            className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-black'
                                }`}
                        >
                            {task.title}
                        </p>
                        {task.description && (
                            <p className="text-sm text-gray-600">{task.description}</p>
                        )}
                        <p className="text-sm text-gray-500">Status: {task.status}</p>
                        {task.dueDate && (
                            <p className="text-sm text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                        {task.priority && (
                            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                        )}
                    </div>
                </div>
                <div
                    className="flex space-x-2"
                    style={{ pointerEvents: 'auto' }} // Ensure buttons receive events
                    onMouseDown={(e) => e.stopPropagation()} // Prevent drag initiation on buttons
                >
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        className="text-blue-500"
                        onClick={(e) => handleButtonClick(e, () => editTask(task))}
                        style={{ pointerEvents: 'auto' }}
                    >
                        Edit
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        className="text-red-500"
                        onClick={(e) => handleButtonClick(e, () => deleteTask(task._id))}
                        style={{ pointerEvents: 'auto' }}
                    >
                        Delete
                    </motion.button>
                </div>
            </li>
        );
    };

    // Group tasks by status
    const tasksByStatus = {
        'To Do': tasks.filter(t => t.status === 'To Do'),
        'In Progress': tasks.filter(t => t.status === 'In Progress'),
        'Done': tasks.filter(t => t.status === 'Done'),
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-12 h-12 border-4 border-t-green-500 border-gray-200 rounded-full"
                />
            </div>
        );
    }

    // Main render
    return (
        <div className="min-h-screen  p-6">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-6"
            >
                Productivity Dashboard
            </motion.h1>

            {/* Motivational Quote */}
            <Quote />

            <div className="grid grid-cols-1 gap-4">
                {/* Daily Tasks */}
                <div className="border border-white p-4 rounded-md shadow-md">
                    <div className="flex justify-between mb-4">
                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-semibold"
                        >
                            Daily Tasks
                        </motion.h2>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => {
                                setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
                                setIsTaskModalOpen(true);
                            }}
                        >
                            Add Task
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['To Do', 'In Progress', 'Done'].map(status => (
                            <div key={status} className="bg-[#C8F7DC] p-2 rounded">
                                <h3 className="text-lg font-medium mb-2 text-black">{status}</h3>
                                {tasksByStatus[status].length === 0 ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-gray-500"
                                    >
                                        No tasks in {status}.
                                    </motion.p>
                                ) : (
                                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <SortableContext
                                            items={tasksByStatus[status].map(t => t._id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <ul>
                                                <AnimatePresence>
                                                    {tasksByStatus[status].map((task, index) => (
                                                        <SortableTask key={task._id} task={task} index={index} />
                                                    ))}
                                                </AnimatePresence>
                                            </ul>
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Goals Section */}
                <div className="border border-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-semibold"
                        >
                            Goals
                        </motion.h2>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => {
                                setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
                                setIsGoalModalOpen(true);
                            }}
                        >
                            Add Goal
                        </motion.button>
                    </div>
                    {goals.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-500"
                        >
                            No goals set.
                        </motion.p>
                    ) : (
                        <ul>
                            <AnimatePresence>
                                {goals.map((goal, index) => (
                                    <motion.li
                                        key={goal._id}
                                        variants={goalVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-2 border-b hover:bg-gray-50"
                                    >
                                        <div>
                                            <p className="font-medium">{goal.title}</p>
                                            {goal.description && <p className="text-sm text-gray-600">{goal.description}</p>}
                                            <p className="text-sm text-gray-500 capitalize">Type: {goal.type}</p>
                                            <p className="text-sm text-gray-500">Status: {goal.status}</p>
                                            {goal.targetDate && <p className="text-sm text-gray-500">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>}
                                        </div>
                                        <div className="flex space-x-2">
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="text-blue-500"
                                                onClick={() => editGoal(goal)}
                                            >
                                                Edit
                                            </motion.button>
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="text-red-500"
                                                onClick={() => deleteGoal(goal._id)}
                                            >
                                                Delete
                                            </motion.button>
                                        </div>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>
                    )}
                </div>
            </div>

            {/* Task Modal */}
            <AnimatePresence>
                {isTaskModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white p-6 rounded-lg w-full max-w-md mt-12"
                        >
                            <h3 className="text-lg font-semibold mb-4">{taskForm.id ? 'Edit Task' : 'Add Task'}</h3>
                            <form onSubmit={handleTaskSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <motion.input
                                        type="text"
                                        className="w-full border rounded p-2"
                                        value={taskForm.title}
                                        onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <motion.textarea
                                        className="w-full border rounded p-2"
                                        value={taskForm.description}
                                        onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <motion.select
                                        className="w-full border rounded p-2"
                                        value={taskForm.status}
                                        onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </motion.select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Due Date</label>
                                    <motion.input
                                        type="date"
                                        className="w-full border rounded p-2"
                                        value={taskForm.dueDate}
                                        onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Priority</label>
                                    <motion.select
                                        className="w-full border rounded p-2"
                                        value={taskForm.priority}
                                        onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </motion.select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <motion.button
                                        type="button"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="text-gray-500"
                                        onClick={() => setIsTaskModalOpen(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Goal Modal */}
            <AnimatePresence>
                {isGoalModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className=" p-6 rounded-lg w-full max-w-md"
                        >
                            <h3 className="text-lg font-semibold mb-4">{goalForm.id ? 'Edit Goal' : 'Add Goal'}</h3>
                            <form onSubmit={handleGoalSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <motion.input
                                        type="text"
                                        className="w-full border rounded p-2"
                                        value={goalForm.title}
                                        onChange={e => setGoalForm({ ...goalForm, title: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <motion.textarea
                                        className="w-full border rounded p-2"
                                        value={goalForm.description}
                                        onChange={e => setGoalForm({ ...goalForm, description: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <motion.select
                                        className="w-full border rounded p-2"
                                        value={goalForm.type}
                                        onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    >
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </motion.select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Target Date</label>
                                    <motion.input
                                        type="date"
                                        className="w-full border rounded p-2"
                                        value={goalForm.targetDate}
                                        onChange={e => setGoalForm({ ...goalForm, targetDate: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <motion.select
                                        className="w-full border rounded p-2"
                                        value={goalForm.status}
                                        onChange={e => setGoalForm({ ...goalForm, status: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    >
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </motion.select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <motion.button
                                        type="button"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="text-gray-500"
                                        onClick={() => setIsGoalModalOpen(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;