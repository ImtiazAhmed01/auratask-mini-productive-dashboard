// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { useNavigate } from 'react-router-dom';
// // import { DndContext, closestCenter } from '@dnd-kit/core';
// // import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import Quote from './Quote';

// // const Dashboard = () => {
// //     const [tasks, setTasks] = useState([]);
// //     const [goals, setGoals] = useState([]);
// //     const [taskForm, setTaskForm] = useState({
// //         title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null
// //     });
// //     const [goalForm, setGoalForm] = useState({
// //         title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null
// //     });
// //     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
// //     const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
// //     const [isLoading, setIsLoading] = useState(true);

// //     const API_URL = 'https://auratasks-mini-productive-dasboard-server.onrender.com';
// //     const token = localStorage.getItem('token');
// //     const navigate = useNavigate();

// //     // Animation Variants
// //     const itemVariants = {
// //         hidden: { opacity: 0, y: 20 },
// //         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
// //         exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
// //     };

// //     const goalVariants = {
// //         hidden: { opacity: 0, y: 20 },
// //         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
// //         exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
// //     };

// //     const modalVariants = {
// //         hidden: { opacity: 0, scale: 0.8, y: 100 },
// //         visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
// //         exit: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.2 } },
// //     };

// //     const buttonVariants = {
// //         hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
// //         tap: { scale: 0.95 },
// //     };

// //     const spinnerVariants = {
// //         animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: 'linear' } },
// //     };

// //     // Fetch Tasks
// //     const fetchTasks = async () => {
// //         try {
// //             const res = await axios.get(`${API_URL}/tasks`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setTasks(res.data);
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to fetch tasks');
// //         }
// //     };

// //     // Fetch Goals
// //     const fetchGoals = async () => {
// //         try {
// //             const res = await axios.get(`${API_URL}/goals`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setGoals(res.data);
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to fetch goals');
// //         }
// //     };

// //     // Handle Drag-and-Drop
// //     const handleDragEnd = async (event) => {
// //         const { active, over } = event;
// //         if (!over || active.id === over.id) return;

// //         const sourceStatus = tasks.find(t => t._id === active.id).status;
// //         const destStatus = tasks.find(t => t._id === over.id).status;

// //         let reorderedTasks = [...tasks];
// //         const oldIndex = tasks.findIndex(t => t._id === active.id);
// //         const newIndex = tasks.findIndex(t => t._id === over.id);
// //         const [movedTask] = reorderedTasks.splice(oldIndex, 1);
// //         movedTask.status = destStatus; // Update status if moved to different column
// //         reorderedTasks.splice(newIndex, 0, movedTask);

// //         setTasks(reorderedTasks);

// //         const updatedTasks = reorderedTasks.map((t, index) => ({
// //             id: t._id,
// //             order: index,
// //             status: t.status,
// //         }));

// //         try {
// //             await axios.post(`${API_URL}/tasks/reorder`, { tasks: updatedTasks }, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             toast.success('Task order saved');
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to save task order');
// //             await fetchTasks();
// //         }
// //     };

// //     // Load data on mount
// //     useEffect(() => {
// //         if (!token) {
// //             toast.error('Please log in to access the dashboard');
// //             navigate('/login');
// //             return;
// //         }

// //         const loadData = async () => {
// //             setIsLoading(true);
// //             await Promise.all([fetchTasks(), fetchGoals()]);
// //             setIsLoading(false);
// //         };

// //         loadData();
// //     }, [token, navigate]);

// //     // Handle Task Form Submission
// //     const handleTaskSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!taskForm.title.trim() || !taskForm.status) {
// //             toast.error('Task title and status are required');
// //             return;
// //         }
// //         if (!token) {
// //             toast.error('Please log in to continue');
// //             navigate('/login');
// //             return;
// //         }
// //         try {
// //             const taskData = {
// //                 title: taskForm.title,
// //                 description: taskForm.description,
// //                 status: taskForm.status,
// //                 dueDate: taskForm.dueDate || null,
// //                 priority: taskForm.priority || null,
// //             };
// //             let res;
// //             if (taskForm.id) {
// //                 res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
// //                 toast.success('Task updated');
// //             } else {
// //                 res = await axios.post(`${API_URL}/tasks`, taskData, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 setTasks([...tasks, res.data]);
// //                 toast.success('Task created');
// //             }
// //             setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
// //             setIsTaskModalOpen(false);
// //         } catch (error) {
// //             if (error.response?.status === 401) {
// //                 try {
// //                     const refreshRes = await axios.post(`${API_URL}/refresh`, {}, {
// //                         headers: { Authorization: `Bearer ${token}` },
// //                     });
// //                     localStorage.setItem('token', refreshRes.data.token);
// //                     const taskData = {
// //                         title: taskForm.title,
// //                         description: taskForm.description,
// //                         status: taskForm.status,
// //                         dueDate: taskForm.dueDate || null,
// //                         priority: taskForm.priority || null,
// //                     };
// //                     let res;
// //                     if (taskForm.id) {
// //                         res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
// //                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
// //                         });
// //                         setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
// //                     } else {
// //                         res = await axios.post(`${API_URL}/tasks`, taskData, {
// //                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
// //                         });
// //                         setTasks([...tasks, res.data]);
// //                     }
// //                     toast.success(taskForm.id ? 'Task updated' : 'Task created');
// //                     setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
// //                     setIsTaskModalOpen(false);
// //                 } catch (refreshError) {
// //                     toast.error('Session expired. Please log in again.');
// //                     localStorage.removeItem('token');
// //                     navigate('/login');
// //                 }
// //             } else {
// //                 toast.error(error.response?.data?.error || 'Failed to save task');
// //             }
// //         }
// //     };

// //     // Handle Goal Form Submission
// //     const handleGoalSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!goalForm.title.trim() || !goalForm.type || !goalForm.status) {
// //             toast.error('Goal title, type, and status are required');
// //             return;
// //         }
// //         try {
// //             const goalData = {
// //                 title: goalForm.title,
// //                 description: goalForm.description,
// //                 type: goalForm.type,
// //                 targetDate: goalForm.targetDate || null,
// //                 status: goalForm.status,
// //             };
// //             if (goalForm.id) {
// //                 const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, goalData, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
// //                 toast.success('Goal updated');
// //             } else {
// //                 const res = await axios.post(`${API_URL}/goals`, goalData, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 setGoals([...goals, res.data]);
// //                 toast.success('Goal created');
// //             }
// //             setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
// //             setIsGoalModalOpen(false);
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to save goal');
// //         }
// //     };

// //     // Delete Task
// //     const deleteTask = async (taskId) => {
// //         try {
// //             await axios.delete(`${API_URL}/tasks/${taskId}`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setTasks(tasks.filter(t => t._id !== taskId));
// //             toast.success('Task deleted');
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to delete task');
// //         }
// //     };

// //     // Delete Goal
// //     const deleteGoal = async (goalId) => {
// //         try {
// //             await axios.delete(`${API_URL}/goals/${goalId}`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setGoals(goals.filter(g => g._id !== goalId));
// //             toast.success('Goal deleted');
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Failed to delete goal');
// //         }
// //     };

// //     // Open Task Edit Form
// //     const editTask = (task) => {
// //         setTaskForm({
// //             title: task.title,
// //             description: task.description || '',
// //             status: task.status,
// //             dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
// //             priority: task.priority || 'Medium',
// //             id: task._id,
// //         });
// //         setIsTaskModalOpen(true);
// //     };

// //     // Open Goal Edit Form
// //     const editGoal = (goal) => {
// //         setGoalForm({
// //             title: goal.title,
// //             description: goal.description || '',
// //             type: goal.type,
// //             targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : '',
// //             status: goal.status,
// //             id: goal._id,
// //         });
// //         setIsGoalModalOpen(true);
// //     };

// //     // Sortable Task Item Component
// //     const SortableTask = ({ task, index }) => {
// //         const {
// //             attributes,
// //             listeners,
// //             setNodeRef,
// //             transform,
// //             transition,
// //             isDragging,
// //         } = useSortable({ id: task._id });

// //         const style = {
// //             transform: CSS.Transform.toString(transform),
// //             transition,
// //         };

// //         // Stop event propagation for button clicks
// //         const handleButtonClick = (e, callback) => {
// //             e.stopPropagation(); // Prevent click from bubbling to parent
// //             callback();
// //         };

// //         return (
// //             <li
// //                 ref={setNodeRef}
// //                 style={style}
// //                 className={`flex items-center justify-between p-2 border-b bg-green-400 hover:bg-gray-100 ${isDragging ? 'shadow-lg scale-105' : ''
// //                     }`}
// //             >
// //                 <div className="flex items-center w-full">
// //                     {/* Drag Handle */}
// //                     <div
// //                         {...attributes}
// //                         {...listeners}
// //                         className="cursor-grab mr-2 text-gray-700 font-semibold"
// //                         style={{ touchAction: 'none' }} // Improve mobile drag behavior
// //                     >
// //                         ☰ {/* Drag handle icon */}
// //                     </div>
// //                     <div className="flex-grow">
// //                         <p
// //                             className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-700 font-semibold' : 'text-black'
// //                                 }`}
// //                         >
// //                             {task.title}
// //                         </p>
// //                         {task.description && (
// //                             <p className="text-sm text-gray-700 font-semibold">{task.description}</p>
// //                         )}
// //                         <p className="text-sm text-gray-700 font-semibold">Status: {task.status}</p>
// //                         {task.dueDate && (
// //                             <p className="text-sm text-gray-700 font-semibold">
// //                                 Due: {new Date(task.dueDate).toLocaleDateString()}
// //                             </p>
// //                         )}
// //                         {task.priority && (
// //                             <p className="text-sm text-gray-700 font-semibold">Priority: {task.priority}</p>
// //                         )}
// //                     </div>
// //                 </div>
// //                 <div
// //                     className="flex space-x-2"
// //                     style={{ pointerEvents: 'auto' }} // Ensure buttons receive events
// //                     onMouseDown={(e) => e.stopPropagation()} // Prevent drag initiation on buttons
// //                 >
// //                     <motion.button
// //                         variants={buttonVariants}
// //                         whileHover="hover"
// //                         className="text-blue-500"
// //                         onClick={(e) => handleButtonClick(e, () => editTask(task))}
// //                         style={{ pointerEvents: 'auto' }}
// //                     >
// //                         Edit
// //                     </motion.button>
// //                     <motion.button
// //                         variants={buttonVariants}
// //                         whileHover="hover"
// //                         className="text-red-500"
// //                         onClick={(e) => handleButtonClick(e, () => deleteTask(task._id))}
// //                         style={{ pointerEvents: 'auto' }}
// //                     >
// //                         Delete
// //                     </motion.button>
// //                 </div>
// //             </li>
// //         );
// //     };

// //     // Group tasks by status
// //     const tasksByStatus = {
// //         'To Do': tasks.filter(t => t.status === 'To Do'),
// //         'In Progress': tasks.filter(t => t.status === 'In Progress'),
// //         'Done': tasks.filter(t => t.status === 'Done'),
// //     };

// //     // Loading state
// //     if (isLoading) {
// //         return (
// //             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //                 <motion.div
// //                     variants={spinnerVariants}
// //                     animate="animate"
// //                     className="w-12 h-12 border-4 border-t-green-500 border-gray-200 rounded-full"
// //                 />
// //             </div>
// //         );
// //     }

// //     // Main render
// //     return (
// //         <div className="min-h-screen  p-6">
// //             <motion.h1
// //                 initial={{ opacity: 0, y: -20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5 }}
// //                 className="text-3xl font-bold text-center mb-6"
// //             >
// //                 Productivity Dashboard
// //             </motion.h1>

// //             {/* Motivational Quote */}
// //             <Quote />

// //             <div className="grid grid-cols-1 gap-4">
// //                 {/* Daily Tasks */}
// //                 <div className="border border-white p-4 rounded-md shadow-md">
// //                     <div className="flex justify-between mb-4">
// //                         <motion.h2
// //                             whileHover={{ scale: 1.05 }}
// //                             className="text-xl font-semibold"
// //                         >
// //                             Daily Tasks
// //                         </motion.h2>
// //                         <motion.button
// //                             variants={buttonVariants}
// //                             whileHover="hover"
// //                             whileTap="tap"
// //                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //                             onClick={() => {
// //                                 setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
// //                                 setIsTaskModalOpen(true);
// //                             }}
// //                         >
// //                             Add Task
// //                         </motion.button>
// //                     </div>
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         {['To Do', 'In Progress', 'Done'].map(status => (
// //                             <div key={status} className="bg-green-400 p-2 rounded">
// //                                 <h3 className="text-lg font-medium mb-2 text-black">{status}</h3>
// //                                 {tasksByStatus[status].length === 0 ? (
// //                                     <motion.p
// //                                         initial={{ opacity: 0 }}
// //                                         animate={{ opacity: 1 }}
// //                                         className="text-gray-700 font-semibold"
// //                                     >
// //                                         No tasks in {status}.
// //                                     </motion.p>
// //                                 ) : (
// //                                     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// //                                         <SortableContext
// //                                             items={tasksByStatus[status].map(t => t._id)}
// //                                             strategy={verticalListSortingStrategy}
// //                                         >
// //                                             <ul>
// //                                                 <AnimatePresence>
// //                                                     {tasksByStatus[status].map((task, index) => (
// //                                                         <SortableTask key={task._id} task={task} index={index} />
// //                                                     ))}
// //                                                 </AnimatePresence>
// //                                             </ul>
// //                                         </SortableContext>
// //                                     </DndContext>
// //                                 )}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* Goals Section */}
// //                 <div className="border border-white p-4 rounded-lg shadow-md">
// //                     <div className="flex justify-between items-center mb-4">
// //                         <motion.h2
// //                             whileHover={{ scale: 1.05 }}
// //                             className="text-xl font-semibold"
// //                         >
// //                             Goals
// //                         </motion.h2>
// //                         <motion.button
// //                             variants={buttonVariants}
// //                             whileHover="hover"
// //                             whileTap="tap"
// //                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //                             onClick={() => {
// //                                 setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
// //                                 setIsGoalModalOpen(true);
// //                             }}
// //                         >
// //                             Add Goal
// //                         </motion.button>
// //                     </div>
// //                     {goals.length === 0 ? (
// //                         <motion.p
// //                             initial={{ opacity: 0 }}
// //                             animate={{ opacity: 1 }}
// //                             className="text-gray-700 font-semibold"
// //                         >
// //                             No goals set.
// //                         </motion.p>
// //                     ) : (
// //                         <ul>
// //                             <AnimatePresence>
// //                                 {goals.map((goal, index) => (
// //                                     <motion.li
// //                                         key={goal._id}
// //                                         variants={goalVariants}
// //                                         initial="hidden"
// //                                         animate="visible"
// //                                         exit="exit"
// //                                         transition={{ delay: index * 0.1 }}
// //                                         className="flex items-center justify-between p-2 border-b hover:bg-green-400 z-10"
// //                                     >
// //                                         <div>
// //                                             <p className="font-medium">{goal.title}</p>
// //                                             {goal.description && <p className="text-sm ">{goal.description}</p>}
// //                                             <p className="text-sm  font-semibold capitalize">Type: {goal.type}</p>
// //                                             <p className="text-sm  font-semibold">Status: {goal.status}</p>
// //                                             {goal.targetDate && <p className="text-sm  font-semibold">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>}
// //                                         </div>
// //                                         <div className="flex space-x-2">
// //                                             <motion.button
// //                                                 variants={buttonVariants}
// //                                                 whileHover="hover"
// //                                                 whileTap="tap"
// //                                                 className="text-blue-500"
// //                                                 onClick={() => editGoal(goal)}
// //                                             >
// //                                                 Edit
// //                                             </motion.button>
// //                                             <motion.button
// //                                                 variants={buttonVariants}
// //                                                 whileHover="hover"
// //                                                 whileTap="tap"
// //                                                 className="text-red-500"
// //                                                 onClick={() => deleteGoal(goal._id)}
// //                                             >
// //                                                 Delete
// //                                             </motion.button>
// //                                         </div>
// //                                     </motion.li>
// //                                 ))}
// //                             </AnimatePresence>
// //                         </ul>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Task Modal */}
// //             <AnimatePresence>
// //                 {isTaskModalOpen && (
// //                     <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
// //                     >
// //                         <motion.div
// //                             variants={modalVariants}
// //                             initial="hidden"
// //                             animate="visible"
// //                             exit="exit"
// //                             className="bg-white p-6 rounded-lg w-full max-w-md mt-12"
// //                         >
// //                             <h3 className="text-lg font-semibold mb-4">{taskForm.id ? 'Edit Task' : 'Add Task'}</h3>
// //                             <form onSubmit={handleTaskSubmit}>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Title</label>
// //                                     <motion.input
// //                                         type="text"
// //                                         className="w-full border rounded p-2"
// //                                         value={taskForm.title}
// //                                         onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
// //                                         required
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Description</label>
// //                                     <motion.textarea
// //                                         className="w-full border rounded p-2"
// //                                         value={taskForm.description}
// //                                         onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Status</label>
// //                                     <motion.select
// //                                         className="w-full border rounded p-2"
// //                                         value={taskForm.status}
// //                                         onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
// //                                         required
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     >
// //                                         <option value="To Do">To Do</option>
// //                                         <option value="In Progress">In Progress</option>
// //                                         <option value="Done">Done</option>
// //                                     </motion.select>
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Due Date</label>
// //                                     <motion.input
// //                                         type="date"
// //                                         className="w-full border rounded p-2"
// //                                         value={taskForm.dueDate}
// //                                         onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Priority</label>
// //                                     <motion.select
// //                                         className="w-full border rounded p-2"
// //                                         value={taskForm.priority}
// //                                         onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     >
// //                                         <option value="Low">Low</option>
// //                                         <option value="Medium">Medium</option>
// //                                         <option value="High">High</option>
// //                                     </motion.select>
// //                                 </div>
// //                                 <div className="flex justify-end space-x-2">
// //                                     <motion.button
// //                                         type="button"
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         className="text-gray-700 font-semibold"
// //                                         onClick={() => setIsTaskModalOpen(false)}
// //                                     >
// //                                         Cancel
// //                                     </motion.button>
// //                                     <motion.button
// //                                         type="submit"
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //                                     >
// //                                         Save
// //                                     </motion.button>
// //                                 </div>
// //                             </form>
// //                         </motion.div>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>

// //             {/* Goal Modal */}
// //             <AnimatePresence>
// //                 {isGoalModalOpen && (
// //                     <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
// //                     >
// //                         <motion.div
// //                             variants={modalVariants}
// //                             initial="hidden"
// //                             animate="visible"
// //                             exit="exit"
// //                             className=" p-6 rounded-lg w-full max-w-md"
// //                         >
// //                             <h3 className="text-lg font-semibold mb-4">{goalForm.id ? 'Edit Goal' : 'Add Goal'}</h3>
// //                             <form onSubmit={handleGoalSubmit}>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Title</label>
// //                                     <motion.input
// //                                         type="text"
// //                                         className="w-full border rounded p-2"
// //                                         value={goalForm.title}
// //                                         onChange={e => setGoalForm({ ...goalForm, title: e.target.value })}
// //                                         required
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Description</label>
// //                                     <motion.textarea
// //                                         className="w-full border rounded p-2"
// //                                         value={goalForm.description}
// //                                         onChange={e => setGoalForm({ ...goalForm, description: e.target.value })}
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Type</label>
// //                                     <motion.select
// //                                         className="w-full border rounded p-2"
// //                                         value={goalForm.type}
// //                                         onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
// //                                         required
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     >
// //                                         <option value="weekly">Weekly</option>
// //                                         <option value="monthly">Monthly</option>
// //                                         <option value="yearly">Yearly</option>
// //                                     </motion.select>
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Target Date</label>
// //                                     <motion.input
// //                                         type="date"
// //                                         className="w-full border rounded p-2"
// //                                         value={goalForm.targetDate}
// //                                         onChange={e => setGoalForm({ ...goalForm, targetDate: e.target.value })}
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     />
// //                                 </div>
// //                                 <div className="mb-4">
// //                                     <label className="block text-sm font-medium mb-1">Status</label>
// //                                     <motion.select
// //                                         className="w-full border rounded p-2"
// //                                         value={goalForm.status}
// //                                         onChange={e => setGoalForm({ ...goalForm, status: e.target.value })}
// //                                         required
// //                                         whileFocus={{ scale: 1.02 }}
// //                                     >
// //                                         <option value="Not Started">Not Started</option>
// //                                         <option value="In Progress">In Progress</option>
// //                                         <option value="Completed">Completed</option>
// //                                     </motion.select>
// //                                 </div>
// //                                 <div className="flex justify-end space-x-2">
// //                                     <motion.button
// //                                         type="button"
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         className="text-gray-700 font-semibold"
// //                                         onClick={() => setIsGoalModalOpen(false)}
// //                                     >
// //                                         Cancel
// //                                     </motion.button>
// //                                     <motion.button
// //                                         type="submit"
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //                                     >
// //                                         Save
// //                                     </motion.button>
// //                                 </div>
// //                             </form>
// //                         </motion.div>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>

// //             <ToastContainer />
// //         </div>
// //     );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { motion, AnimatePresence } from 'framer-motion';
// import Quote from './Quote';

// const Dashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [goals, setGoals] = useState([]);
//     const [taskForm, setTaskForm] = useState({
//         title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null
//     });
//     const [goalForm, setGoalForm] = useState({
//         title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null
//     });
//     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//     const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     const API_URL = 'https://auratasks-mini-productive-dasboard-server.onrender.com';
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

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

//     const handleDragEnd = async (event) => {
//         const { active, over } = event;
//         if (!over || active.id === over.id) return;

//         const sourceStatus = tasks.find(t => t._id === active.id).status;
//         const destStatus = tasks.find(t => t._id === over.id).status;

//         let reorderedTasks = [...tasks];
//         const oldIndex = tasks.findIndex(t => t._id === active.id);
//         const newIndex = tasks.findIndex(t => t._id === over.id);
//         const [movedTask] = reorderedTasks.splice(oldIndex, 1);
//         movedTask.status = destStatus;
//         reorderedTasks.splice(newIndex, 0, movedTask);

//         setTasks(reorderedTasks);

//         const updatedTasks = reorderedTasks.map((t, index) => ({
//             id: t._id,
//             order: index,
//             status: t.status,
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

//     const handleTaskSubmit = async (e) => {
//         e.preventDefault();
//         if (!taskForm.title.trim() || !taskForm.status) {
//             toast.error('Task title and status are required');
//             return;
//         }
//         if (!token) {
//             toast.error('Please log in to continue');
//             navigate('/login');
//             return;
//         }
//         try {
//             const taskData = {
//                 title: taskForm.title,
//                 description: taskForm.description,
//                 status: taskForm.status,
//                 dueDate: taskForm.dueDate || null,
//                 priority: taskForm.priority || null,
//             };
//             let res;
//             if (taskForm.id) {
//                 res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                 toast.success('Task updated');
//             } else {
//                 res = await axios.post(`${API_URL}/tasks`, taskData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks([...tasks, res.data]);
//                 toast.success('Task created');
//             }
//             setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//             setIsTaskModalOpen(false);
//         } catch (error) {
//             if (error.response?.status === 401) {
//                 try {
//                     const refreshRes = await axios.post(`${API_URL}/refresh`, {}, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     localStorage.setItem('token', refreshRes.data.token);
//                     const taskData = {
//                         title: taskForm.title,
//                         description: taskForm.description,
//                         status: taskForm.status,
//                         dueDate: taskForm.dueDate || null,
//                         priority: taskForm.priority || null,
//                     };
//                     let res;
//                     if (taskForm.id) {
//                         res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
//                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
//                         });
//                         setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                     } else {
//                         res = await axios.post(`${API_URL}/tasks`, taskData, {
//                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
//                         });
//                         setTasks([...tasks, res.data]);
//                     }
//                     toast.success(taskForm.id ? 'Task updated' : 'Task created');
//                     setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//                     setIsTaskModalOpen(false);
//                 } catch (refreshError) {
//                     toast.error('Session expired. Please log in again.');
//                     localStorage.removeItem('token');
//                     navigate('/login');
//                 }
//             } else {
//                 toast.error(error.response?.data?.error || 'Failed to save task');
//             }
//         }
//     };

//     const handleGoalSubmit = async (e) => {
//         e.preventDefault();
//         if (!goalForm.title.trim() || !goalForm.type || !goalForm.status) {
//             toast.error('Goal title, type, and status are required');
//             return;
//         }
//         try {
//             const goalData = {
//                 title: goalForm.title,
//                 description: goalForm.description,
//                 type: goalForm.type,
//                 targetDate: goalForm.targetDate || null,
//                 status: goalForm.status,
//             };
//             if (goalForm.id) {
//                 const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, goalData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
//                 toast.success('Goal updated');
//             } else {
//                 const res = await axios.post(`${API_URL}/goals`, goalData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals([...goals, res.data]);
//                 toast.success('Goal created');
//             }
//             setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
//             setIsGoalModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save goal');
//         }
//     };

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

//     const editTask = (task) => {
//         setTaskForm({
//             title: task.title,
//             description: task.description || '',
//             status: task.status,
//             dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//             priority: task.priority || 'Medium',
//             id: task._id,
//         });
//         setIsTaskModalOpen(true);
//     };

//     const editGoal = (goal) => {
//         setGoalForm({
//             title: goal.title,
//             description: goal.description || '',
//             type: goal.type,
//             targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : '',
//             status: goal.status,
//             id: goal._id,
//         });
//         setIsGoalModalOpen(true);
//     };

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
//             zIndex: 11, // Ensure sortable tasks are above Quote background
//         };

//         const handleButtonClick = (e, callback) => {
//             e.stopPropagation();
//             callback();
//         };

//         return (
//             <li
//                 ref={setNodeRef}
//                 style={style}
//                 className={`flex items-center justify-between p-2 border-b bg-green-400 hover:bg-gray-100 ${isDragging ? 'shadow-lg scale-105' : ''}`}
//             >
//                 <div className="flex items-center w-full">
//                     <div
//                         {...attributes}
//                         {...listeners}
//                         className="cursor-grab mr-2 text-gray-700 font-semibold"
//                         style={{ touchAction: 'none' }}
//                     >
//                         ☰
//                     </div>
//                     <div className="flex-grow">
//                         <p
//                             className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-700 font-semibold' : 'text-black'}`}
//                         >
//                             {task.title}
//                         </p>
//                         {task.description && (
//                             <p className="text-sm text-gray-700 font-semibold">{task.description}</p>
//                         )}
//                         <p className="text-sm text-gray-700 font-semibold">Status: {task.status}</p>
//                         {task.dueDate && (
//                             <p className="text-sm text-gray-700 font-semibold">
//                                 Due: {new Date(task.dueDate).toLocaleDateString()}
//                             </p>
//                         )}
//                         {task.priority && (
//                             <p className="text-sm text-gray-700 font-semibold">Priority: {task.priority}</p>
//                         )}
//                     </div>
//                 </div>
//                 <div
//                     className="flex space-x-2"
//                     style={{ pointerEvents: 'auto' }}
//                     onMouseDown={(e) => e.stopPropagation()}
//                 >
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover="hover"
//                         className="text-blue-500"
//                         onClick={(e) => handleButtonClick(e, () => editTask(task))}
//                         style={{ pointerEvents: 'auto' }}
//                     >
//                         Edit
//                     </motion.button>
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover="hover"
//                         className="text-red-500"
//                         onClick={(e) => handleButtonClick(e, () => deleteTask(task._id))}
//                         style={{ pointerEvents: 'auto' }}
//                     >
//                         Delete
//                     </motion.button>
//                 </div>
//             </li>
//         );
//     };

//     const tasksByStatus = {
//         'To Do': tasks.filter(t => t.status === 'To Do'),
//         'In Progress': tasks.filter(t => t.status === 'In Progress'),
//         'Done': tasks.filter(t => t.status === 'Done'),
//     };

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

//     return (
//         <div className="min-h-screen p-6" style={{ zIndex: 10 }}>
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold text-center mb-6"
//             >
//                 Productivity Dashboard
//             </motion.h1>

//             <Quote />

//             <div className="grid grid-cols-1 gap-4">
//                 <div className="border border-white p-4 rounded-md shadow-md" style={{ zIndex: 11 }}>
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
//                                 setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//                                 setIsTaskModalOpen(true);
//                             }}
//                         >
//                             Add Task
//                         </motion.button>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {['To Do', 'In Progress', 'Done'].map(status => (
//                             <div key={status} className="bg-green-400 p-2 rounded">
//                                 <h3 className="text-lg font-medium mb-2 text-black">{status}</h3>
//                                 {tasksByStatus[status].length === 0 ? (
//                                     <motion.p
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         className="text-gray-700 font-semibold"
//                                     >
//                                         No tasks in {status}.
//                                     </motion.p>
//                                 ) : (
//                                     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                                         <SortableContext
//                                             items={tasksByStatus[status].map(t => t._id)}
//                                             strategy={verticalListSortingStrategy}
//                                         >
//                                             <ul>
//                                                 <AnimatePresence>
//                                                     {tasksByStatus[status].map((task, index) => (
//                                                         <SortableTask key={task._id} task={task} index={index} />
//                                                     ))}
//                                                 </AnimatePresence>
//                                             </ul>
//                                         </SortableContext>
//                                     </DndContext>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="border border-white p-4 rounded-lg shadow-md" style={{ zIndex: 11 }}>
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
//                                 setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
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
//                             className="text-gray-700 font-semibold"
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
//                                         className="flex items-center justify-between p-2 border-b hover:bg-green-400 z-10"
//                                         style={{ zIndex: 11 }} // Override className z-10 with higher z-index
//                                     >
//                                         <div>
//                                             <p className="font-medium">{goal.title}</p>
//                                             {goal.description && <p className="text-sm">{goal.description}</p>}
//                                             <p className="text-sm font-semibold capitalize">Type: {goal.type}</p>
//                                             <p className="text-sm font-semibold">Status: {goal.status}</p>
//                                             {goal.targetDate && <p className="text-sm font-semibold">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>}
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

//             <AnimatePresence>
//                 {isTaskModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                         style={{ zIndex: 20 }}
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className="bg-white p-6 text-black rounded-lg w-full max-w-md mt-12"
//                             style={{ zIndex: 21 }}
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
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.status}
//                                         onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="To Do">To Do</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Done">Done</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Due Date</label>
//                                     <motion.input
//                                         type="date"
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.dueDate}
//                                         onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Priority</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.priority}
//                                         onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-700 font-semibold"
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

//             <AnimatePresence>
//                 {isGoalModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                         style={{ zIndex: 20 }}
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className=" p-6 rounded-lg w-full max-w-md"
//                             style={{ zIndex: 21 }}
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
//                                         onChange={e => setGoalForm({ ...goalForm, description: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Type</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.type}
//                                         onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="weekly">Weekly</option>
//                                         <option value="monthly">Monthly</option>
//                                         <option value="yearly">Yearly</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Target Date</label>
//                                     <motion.input
//                                         type="date"
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.targetDate}
//                                         onChange={e => setGoalForm({ ...goalForm, targetDate: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.status}
//                                         onChange={e => setGoalForm({ ...goalForm, status: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="Not Started">Not Started</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-700 font-semibold"
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { motion, AnimatePresence } from 'framer-motion';
// import Quote from './Quote';

// const Dashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [goals, setGoals] = useState([]);
//     const [taskForm, setTaskForm] = useState({
//         title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null
//     });
//     const [goalForm, setGoalForm] = useState({
//         title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null
//     });
//     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//     const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     const API_URL = 'https://auratasks-mini-productive-dasboard-server.onrender.com';
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     // Set current date for comparison (May 29, 2025)
//     const currentDate = new Date('2025-05-29');
//     const currentDateString = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

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

//     const handleDragEnd = async (event) => {
//         const { active, over } = event;
//         if (!over || active.id === over.id) return;

//         const sourceStatus = tasks.find(t => t._id === active.id).status;
//         const destStatus = tasks.find(t => t._id === over.id).status;

//         let reorderedTasks = [...tasks];
//         const oldIndex = tasks.findIndex(t => t._id === active.id);
//         const newIndex = tasks.findIndex(t => t._id === over.id);
//         const [movedTask] = reorderedTasks.splice(oldIndex, 1);
//         movedTask.status = destStatus;
//         reorderedTasks.splice(newIndex, 0, movedTask);

//         setTasks(reorderedTasks);

//         const updatedTasks = reorderedTasks.map((t, index) => ({
//             id: t._id,
//             order: index,
//             status: t.status,
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

//     const handleTaskSubmit = async (e) => {
//         e.preventDefault();
//         if (!taskForm.title.trim() || !taskForm.status) {
//             toast.error('Task title and status are required');
//             return;
//         }
//         if (!token) {
//             toast.error('Please log in to continue');
//             navigate('/login');
//             return;
//         }
//         try {
//             const taskData = {
//                 title: taskForm.title,
//                 description: taskForm.description,
//                 status: taskForm.status,
//                 dueDate: taskForm.dueDate || null,
//                 priority: taskForm.priority || null,
//             };
//             let res;
//             if (taskForm.id) {
//                 res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                 toast.success('Task updated');
//             } else {
//                 res = await axios.post(`${API_URL}/tasks`, taskData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks([...tasks, res.data]);
//                 toast.success('Task created');
//             }
//             setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//             setIsTaskModalOpen(false);
//         } catch (error) {
//             if (error.response?.status === 401) {
//                 try {
//                     const refreshRes = await axios.post(`${API_URL}/refresh`, {}, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     localStorage.setItem('token', refreshRes.data.token);
//                     const taskData = {
//                         title: taskForm.title,
//                         description: taskForm.description,
//                         status: taskForm.status,
//                         dueDate: taskForm.dueDate || null,
//                         priority: taskForm.priority || null,
//                     };
//                     let res;
//                     if (taskForm.id) {
//                         res = await axios.put(`${API_URL}/tasks/${taskForm.id}`, taskData, {
//                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
//                         });
//                         setTasks(tasks.map(t => t._id === taskForm.id ? res.data : t));
//                     } else {
//                         res = await axios.post(`${API_URL}/tasks`, taskData, {
//                             headers: { Authorization: `Bearer ${refreshRes.data.token}` },
//                         });
//                         setTasks([...tasks, res.data]);
//                     }
//                     toast.success(taskForm.id ? 'Task updated' : 'Task created');
//                     setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//                     setIsTaskModalOpen(false);
//                 } catch (refreshError) {
//                     toast.error('Session expired. Please log in again.');
//                     localStorage.removeItem('token');
//                     navigate('/login');
//                 }
//             } else {
//                 toast.error(error.response?.data?.error || 'Failed to save task');
//             }
//         }
//     };

//     const handleGoalSubmit = async (e) => {
//         e.preventDefault();
//         if (!goalForm.title.trim() || !goalForm.type || !goalForm.status) {
//             toast.error('Goal title, type, and status are required');
//             return;
//         }
//         try {
//             const goalData = {
//                 title: goalForm.title,
//                 description: goalForm.description,
//                 type: goalForm.type,
//                 targetDate: goalForm.targetDate || null,
//                 status: goalForm.status,
//             };
//             if (goalForm.id) {
//                 const res = await axios.put(`${API_URL}/goals/${goalForm.id}`, goalData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals(goals.map(g => g._id === goalForm.id ? res.data : g));
//                 toast.success('Goal updated');
//             } else {
//                 const res = await axios.post(`${API_URL}/goals`, goalData, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setGoals([...goals, res.data]);
//                 toast.success('Goal created');
//             }
//             setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
//             setIsGoalModalOpen(false);
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Failed to save goal');
//         }
//     };

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

//     const editTask = (task) => {
//         setTaskForm({
//             title: task.title,
//             description: task.description || '',
//             status: task.status,
//             dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//             priority: task.priority || 'Medium',
//             id: task._id,
//         });
//         setIsTaskModalOpen(true);
//     };

//     const editGoal = (goal) => {
//         setGoalForm({
//             title: goal.title,
//             description: goal.description || '',
//             type: goal.type,
//             targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : '',
//             status: goal.status,
//             id: goal._id,
//         });
//         setIsGoalModalOpen(true);
//     };

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
//             zIndex: 11,
//         };

//         const handleButtonClick = (e, callback) => {
//             e.stopPropagation();
//             callback();
//         };

//         const isExpired = task.dueDate && new Date(task.dueDate) < currentDate;
//         const priorityColor = task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500';

//         return (
//             <li
//                 ref={setNodeRef}
//                 style={style}
//                 className={`flex items-center justify-between my-3 p-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 ${isDragging ? 'shadow-lg scale-105' : ''} ${isExpired ? 'border-red-300' : ''}`}
//             >
//                 <div className="flex items-center w-full">
//                     <div
//                         {...attributes}
//                         {...listeners}
//                         className="cursor-grab mr-2 text-gray-600"
//                         style={{ touchAction: 'none' }}
//                     >
//                         ☰
//                     </div>
//                     <div className="flex-grow">
//                         <p className={`font-medium ${isExpired || task.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
//                             {task.title}
//                         </p>
//                         {task.description && (
//                             <p className="text-sm text-gray-600">{task.description}</p>
//                         )}
//                         <p className="text-sm text-gray-600">Status: {task.status}</p>
//                         {task.dueDate && (
//                             <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//                         )}
//                         {task.priority && (
//                             <p className={`text-sm ${priorityColor}`}>Priority: {task.priority}</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex space-x-2" onMouseDown={(e) => e.stopPropagation()}>
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover={isExpired ? {} : "hover"}
//                         className={`text-blue-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         onClick={(e) => !isExpired && handleButtonClick(e, () => editTask(task))}
//                         disabled={isExpired}
//                     >
//                         Edit
//                     </motion.button>
//                     <motion.button
//                         variants={buttonVariants}
//                         whileHover={isExpired ? {} : "hover"}
//                         className={`text-red-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         onClick={(e) => !isExpired && handleButtonClick(e, () => deleteTask(task._id))}
//                         disabled={isExpired}
//                     >
//                         Delete
//                     </motion.button>
//                 </div>
//             </li>
//         );
//     };
//     const tasksByStatus = {
//         'To Do': tasks.filter(t => t.status === 'To Do'),
//         'In Progress': tasks.filter(t => t.status === 'In Progress'),
//         'Done': tasks.filter(t => t.status === 'Done'),
//     };

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

//     return (
//         <div className="min-h-screen p-6" style={{ zIndex: 10 }}>
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold text-center mb-6"
//             >
//                 Productivity Dashboard
//             </motion.h1>

//             <Quote />

//             <div className="grid grid-cols-1 gap-4 mt-5">
//                 <div className="border border-white p-4 rounded-md shadow-md" style={{ zIndex: 11 }}>
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
//                                 setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
//                                 setIsTaskModalOpen(true);
//                             }}
//                         >
//                             Add Task
//                         </motion.button>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {['To Do', 'In Progress', 'Done'].map(status => (
//                             <div key={status} className="bg-green-400 p-2 rounded">
//                                 <h3 className="text-lg font-medium mb-2 text-black">{status}</h3>
//                                 {tasksByStatus[status].length === 0 ? (
//                                     <motion.p
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         className="text-gray-700 font-semibold"
//                                     >
//                                         No tasks in {status}.
//                                     </motion.p>
//                                 ) : (
//                                     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                                         <SortableContext
//                                             items={tasksByStatus[status].map(t => t._id)}
//                                             strategy={verticalListSortingStrategy}
//                                         >
//                                             <ul>
//                                                 <AnimatePresence>
//                                                     {tasksByStatus[status].map((task, index) => (
//                                                         <SortableTask key={task._id} task={task} index={index} />
//                                                     ))}
//                                                 </AnimatePresence>
//                                             </ul>
//                                         </SortableContext>
//                                     </DndContext>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="border border-white p-4 rounded-lg shadow-md" style={{ zIndex: 11 }}>
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
//                                 setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
//                                 setIsGoalModalOpen(true);
//                             }}
//                         >
//                             Add Goal
//                         </motion.button>
//                     </div>
//                     {/* {goals.length === 0 ? (
//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="text-gray-700 font-semibold"
//                         >
//                             No goals set.
//                         </motion.p>
//                     ) : (
//                         <ul>
//                             <AnimatePresence>
//                                 {goals.map((goal, index) => {
//                                     // Check if goal is expired
//                                     const isExpired = goal.targetDate && new Date(goal.targetDate) < currentDate;
//                                     return (
//                                         <motion.li
//                                             key={goal._id}
//                                             variants={goalVariants}
//                                             initial="hidden"
//                                             animate="visible"
//                                             exit="exit"
//                                             transition={{ delay: index * 0.1 }}
//                                             className={`flex items-center justify-between p-2 border-b hover:bg-green-400 z-10 ${isExpired ? 'opacity-70' : ''}`}
//                                             style={{ zIndex: 11 }}
//                                         >
//                                             <div>
//                                                 <p className={`font-medium ${isExpired ? 'line-through text-gray-700' : ''}`}>
//                                                     {goal.title}
//                                                 </p>
//                                                 {goal.description && <p className="text-sm">{goal.description}</p>}
//                                                 <p className="text-sm font-semibold capitalize">Type: {goal.type}</p>
//                                                 <p className="text-sm font-semibold">Status: {goal.status}</p>
//                                                 {goal.targetDate && <p className="text-sm font-semibold">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>}
//                                             </div>
//                                             <div className="flex space-x-2">
//                                                 <motion.button
//                                                     variants={buttonVariants}
//                                                     whileHover={isExpired ? {} : "hover"}
//                                                     whileTap={isExpired ? {} : "tap"}
//                                                     className={`text-blue-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                     onClick={() => !isExpired && editGoal(goal)}
//                                                     disabled={isExpired}
//                                                 >
//                                                     Edit
//                                                 </motion.button>
//                                                 <motion.button
//                                                     variants={buttonVariants}
//                                                     whileHover={isExpired ? {} : "hover"}
//                                                     whileTap={isExpired ? {} : "tap"}
//                                                     className={`text-red-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                     onClick={() => !isExpired && deleteGoal(goal._id)}
//                                                     disabled={isExpired}
//                                                 >
//                                                     Delete
//                                                 </motion.button>
//                                             </div>
//                                         </motion.li>
//                                     );
//                                 })}
//                             </AnimatePresence>
//                         </ul>
//                     )} */}
//                     {goals.length > 0 && (
//                         <ul>
//                             <AnimatePresence>
//                                 {goals.map((goal, index) => {
//                                     const isExpired = goal.targetDate && new Date(goal.targetDate) < currentDate;
//                                     return (
//                                         <motion.li
//                                             key={goal._id}
//                                             variants={goalVariants}
//                                             initial="hidden"
//                                             animate="visible"
//                                             exit="exit"
//                                             transition={{ delay: index * 0.1 }}
//                                             className={`flex items-center justify-between p-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 ${isExpired ? 'border-red-300' : ''}`}
//                                             style={{ zIndex: 11 }}
//                                         >
//                                             <div>
//                                                 <p className={`font-medium ${isExpired ? 'line-through text-gray-500' : 'text-gray-900'}`}>
//                                                     {goal.title}
//                                                 </p>
//                                                 {goal.description && <p className="text-sm text-gray-600">{goal.description}</p>}
//                                                 <p className="text-sm text-gray-600 capitalize">Type: {goal.type}</p>
//                                                 <p className="text-sm text-gray-600">Status: {goal.status}</p>
//                                                 {goal.targetDate && <p className="text-sm text-gray-600">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>}
//                                             </div>
//                                             <div className="flex space-x-2">
//                                                 <motion.button
//                                                     variants={buttonVariants}
//                                                     whileHover={isExpired ? {} : "hover"}
//                                                     whileTap={isExpired ? {} : "tap"}
//                                                     className={`text-blue-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                     onClick={() => !isExpired && editGoal(goal)}
//                                                     disabled={isExpired}
//                                                 >
//                                                     Edit
//                                                 </motion.button>
//                                                 <motion.button
//                                                     variants={buttonVariants}
//                                                     whileHover={isExpired ? {} : "hover"}
//                                                     whileTap={isExpired ? {} : "tap"}
//                                                     className={`text-red-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                     onClick={() => !isExpired && deleteGoal(goal._id)}
//                                                     disabled={isExpired}
//                                                 >
//                                                     Delete
//                                                 </motion.button>
//                                             </div>
//                                         </motion.li>
//                                     );
//                                 })}
//                             </AnimatePresence>
//                         </ul>
//                     )}
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {isTaskModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                         style={{ zIndex: 20 }}
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className="bg-white p-6 text-black rounded-lg w-full max-w-md mt-12"
//                             style={{ zIndex: 21 }}
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
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.status}
//                                         onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="To Do">To Do</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Done">Done</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Due Date</label>
//                                     <motion.input
//                                         type="date"
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.dueDate}
//                                         onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
//                                         min={currentDateString} // Prevent selecting past dates
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Priority</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={taskForm.priority}
//                                         onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-700 font-semibold"
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

//             <AnimatePresence>
//                 {isGoalModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                         style={{ zIndex: 20 }}
//                     >
//                         <motion.div
//                             variants={modalVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className=" p-6 rounded-lg w-full max-w-md text-black bg-white"
//                             style={{ zIndex: 21 }}
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
//                                         onChange={e => setGoalForm({ ...goalForm, description: e.target.value })}
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Type</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.type}
//                                         onChange={e => setGoalForm({ ...goalForm, type: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="weekly">Weekly</option>
//                                         <option value="monthly">Monthly</option>
//                                         <option value="yearly">Yearly</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Target Date</label>
//                                     <motion.input
//                                         type="date"
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.targetDate}
//                                         onChange={e => setGoalForm({ ...goalForm, targetDate: e.target.value })}
//                                         min={currentDateString} // Prevent selecting past dates
//                                         whileFocus={{ scale: 1.02 }}
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <motion.select
//                                         className="w-full border rounded p-2"
//                                         value={goalForm.status}
//                                         onChange={e => setGoalForm({ ...goalForm, status: e.target.value })}
//                                         required
//                                         whileFocus={{ scale: 1.02 }}
//                                     >
//                                         <option value="Not Started">Not Started</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                     </motion.select>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <motion.button
//                                         type="button"
//                                         variants={buttonVariants}
//                                         whileHover="hover"
//                                         whileTap="tap"
//                                         className="text-gray-700 font-semibold"
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
        title: '',
        description: '',
        status: 'To Do',
        dueDate: '',
        priority: 'Medium',
        id: null,
    });
    const [goalForm, setGoalForm] = useState({
        title: '',
        description: '',
        type: 'weekly',
        targetDate: '',
        status: 'Not Started',
        id: null,
    });
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = 'https://auratasks-mini-productive-dasboard-server.onrender.com';
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Set current date for comparison (May 29, 2025, 05:44 PM +06)
    const currentDate = new Date('2025-05-29T17:44:00+06:00');
    const currentDateString = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

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

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceStatus = tasks.find((t) => t._id === active.id).status;
        const destStatus = tasks.find((t) => t._id === over.id).status;

        let reorderedTasks = [...tasks];
        const oldIndex = tasks.findIndex((t) => t._id === active.id);
        const newIndex = tasks.findIndex((t) => t._id === over.id);
        const [movedTask] = reorderedTasks.splice(oldIndex, 1);
        movedTask.status = destStatus;
        reorderedTasks.splice(newIndex, 0, movedTask);

        setTasks(reorderedTasks);

        const updatedTasks = reorderedTasks.map((t, index) => ({
            id: t._id,
            order: index,
            status: t.status,
        }));

        try {
            await axios.post(
                `${API_URL}/tasks/reorder`,
                { tasks: updatedTasks },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success('Task order saved');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save task order');
            await fetchTasks();
        }
    };

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
                setTasks(tasks.map((t) => (t._id === taskForm.id ? res.data : t)));
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
                    const refreshRes = await axios.post(
                        `${API_URL}/refresh`,
                        {},
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
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
                        setTasks(tasks.map((t) => (t._id === taskForm.id ? res.data : t)));
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
                setGoals(goals.map((g) => (g._id === goalForm.id ? res.data : g)));
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

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((t) => t._id !== taskId));
            toast.success('Task deleted');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete task');
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            await axios.delete(`${API_URL}/goals/${goalId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(goals.filter((g) => g._id !== goalId));
            toast.success('Goal deleted');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete goal');
        }
    };

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

    const SortableTask = ({ task, index }) => {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: 11, // Z-index applied here for drag-and-drop and button functionality
        };

        const handleButtonClick = (e, callback) => {
            e.stopPropagation();
            callback();
        };

        const isExpired = task.dueDate && new Date(task.dueDate) < currentDate;
        const priorityColor = task.priority === 'High' ? 'dark:text-red-400 text-red-500' : task.priority === 'Medium' ? 'dark:text-yellow-400 text-yellow-500' : 'dark:text-green-400 text-green-500';

        return (
            <li
                ref={setNodeRef}
                style={style}
                className={`relative flex items-center justify-between my-3 p-4 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 bg-white hover:dark:bg-gray-700 hover:bg-gray-50 ${isDragging ? 'shadow-lg scale-105' : ''} ${isExpired ? 'dark:border-red-500 border-red-300' : ''}`}
            >
                <div className="flex items-center w-full">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab mr-2 dark:text-gray-400 text-gray-600"
                        style={{ touchAction: 'none' }}
                    >
                        ☰
                    </div>
                    <div className="flex-grow">
                        <p
                            className={`font-medium ${isExpired || task.status === 'Done' ? 'line-through dark:text-gray-500 text-gray-500' : 'dark:text-gray-100 text-gray-900'}`}
                        >
                            {task.title}
                        </p>
                        {task.description && <p className="text-sm dark:text-gray-400 text-gray-600">{task.description}</p>}
                        <p className="text-sm dark:text-gray-400 text-gray-600">Status: {task.status}</p>
                        {task.dueDate && (
                            <p className="text-sm dark:text-gray-400 text-gray-600">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                        {task.priority && <p className={`text-sm ${priorityColor}`}>Priority: {task.priority}</p>}
                    </div>
                </div>
                <div className="flex space-x-2" onMouseDown={(e) => e.stopPropagation()}>
                    <motion.button
                        variants={buttonVariants}
                        whileHover={isExpired ? {} : 'hover'}
                        whileTap={isExpired ? {} : 'tap'}
                        className={`dark:text-blue-400 text-blue-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => !isExpired && handleButtonClick(e, () => editTask(task))}
                        disabled={isExpired}
                    >
                        Edit
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        whileHover={isExpired ? {} : 'hover'}
                        whileTap={isExpired ? {} : 'tap'}
                        className={`dark:text-red-400 text-red-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => !isExpired && handleButtonClick(e, () => deleteTask(task._id))}
                        disabled={isExpired}
                    >
                        Delete
                    </motion.button>
                </div>
            </li>
        );
    };

    const tasksByStatus = {
        'To Do': tasks.filter((t) => t.status === 'To Do'),
        'In Progress': tasks.filter((t) => t.status === 'In Progress'),
        Done: tasks.filter((t) => t.status === 'Done'),
    };

    if (isLoading) {
        return (
            <div className="min-h-screen dark:bg-gray-900 bg-gray-100 flex items-center justify-center">
                <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-12 h-12 border-4 border-t-green-500 dark:border-gray-700 border-gray-200 rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 dark:bg-gray-900">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-6 dark:text-gray-100 text-gray-900"
            >
                Productivity Dashboard
            </motion.h1>

            <Quote />

            <div className="grid grid-cols-1 gap-4 mt-5">
                <div className="border dark:border-gray-700 border-white p-4 rounded-md shadow-md">
                    <div className="flex justify-between mb-4">
                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-semibold dark:text-gray-100 text-gray-900"
                        >
                            Daily Tasks
                        </motion.h2>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-green-500 text-white px-4 py-2 rounded dark:hover:bg-green-600 hover:bg-green-600"
                            onClick={() => {
                                setTaskForm({ title: '', description: '', status: 'To Do', dueDate: '', priority: 'Medium', id: null });
                                setIsTaskModalOpen(true);
                            }}
                        >
                            Add Task
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['To Do', 'In Progress', 'Done'].map((status) => (
                            <div key={status} className="dark:bg-gray-800 bg-green-400 p-2 rounded">
                                <h3 className="text-lg font-medium mb-2 dark:text-gray-100 text-black">{status}</h3>
                                {tasksByStatus[status].length === 0 ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="dark:text-gray-400 text-gray-700 font-semibold"
                                    >
                                        No tasks in {status}.
                                    </motion.p>
                                ) : (
                                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <SortableContext
                                            items={tasksByStatus[status].map((t) => t._id)}
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

                <div className="border dark:border-gray-700 border-white p-4 rounded-lg shadow-md" style={{ zIndex: 11 }}>
                    <div className="flex justify-between items-center mb-4">
                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-semibold dark:text-gray-100 text-gray-900"
                        >
                            Goals
                        </motion.h2>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-green-500 text-white px-4 py-2 rounded dark:hover:bg-green-600 hover:bg-green-600"
                            onClick={() => {
                                setGoalForm({ title: '', description: '', type: 'weekly', targetDate: '', status: 'Not Started', id: null });
                                setIsGoalModalOpen(true);
                            }}
                        >
                            Add Goal
                        </motion.button>
                    </div>
                    {goals.length > 0 && (
                        <ul>
                            <AnimatePresence>
                                {goals.map((goal, index) => {
                                    const isExpired = goal.targetDate && new Date(goal.targetDate) < currentDate;
                                    return (
                                        <motion.li
                                            key={goal._id}
                                            variants={goalVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center justify-between p-4 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 bg-white hover:dark:bg-gray-700 hover:bg-gray-50 ${isExpired ? 'dark:border-red-500 border-red-300' : ''}`}
                                            style={{ zIndex: 11 }}
                                        >
                                            <div>
                                                <p
                                                    className={`font-medium ${isExpired ? 'line-through dark:text-gray-500 text-gray-500' : 'dark:text-gray-100 text-gray-900'}`}
                                                >
                                                    {goal.title}
                                                </p>
                                                {goal.description && (
                                                    <p className="text-sm dark:text-gray-400 text-gray-600">{goal.description}</p>
                                                )}
                                                <p className="text-sm dark:text-gray-400 text-gray-600 capitalize">Type: {goal.type}</p>
                                                <p className="text-sm dark:text-gray-400 text-gray-600">Status: {goal.status}</p>
                                                {goal.targetDate && (
                                                    <p className="text-sm dark:text-gray-400 text-gray-600">
                                                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    variants={buttonVariants}
                                                    whileHover={isExpired ? {} : 'hover'}
                                                    whileTap={isExpired ? {} : 'tap'}
                                                    className={`dark:text-blue-400 text-blue-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => !isExpired && editGoal(goal)}
                                                    disabled={isExpired}
                                                >
                                                    Edit
                                                </motion.button>
                                                <motion.button
                                                    variants={buttonVariants}
                                                    whileHover={isExpired ? {} : 'hover'}
                                                    whileTap={isExpired ? {} : 'tap'}
                                                    className={`dark:text-red-400 text-red-500 ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => !isExpired && deleteGoal(goal._id)}
                                                    disabled={isExpired}
                                                >
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </AnimatePresence>
                        </ul>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isTaskModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        style={{ zIndex: 20 }}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="dark:bg-gray-800 bg-white p-6 dark:text-gray-100 text-black rounded-lg w-full max-w-md mt-12"
                            style={{ zIndex: 21 }}
                        >
                            <h3 className="text-lg font-semibold mb-4">{taskForm.id ? 'Edit Task' : 'Add Task'}</h3>
                            <form onSubmit={handleTaskSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <motion.input
                                        type="text"
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={taskForm.title}
                                        onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <motion.textarea
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={taskForm.description}
                                        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <motion.select
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={taskForm.status}
                                        onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
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
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={taskForm.dueDate}
                                        onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                                        min={currentDateString}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Priority</label>
                                    <motion.select
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={taskForm.priority}
                                        onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
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
                                        className="dark:text-gray-400 text-gray-700 font-semibold"
                                        onClick={() => setIsTaskModalOpen(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="bg-green-500 text-white px-4 py-2 rounded dark:hover:bg-green-600 hover:bg-green-600"
                                    >
                                        Save
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isGoalModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        style={{ zIndex: 20 }}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="dark:bg-gray-800 bg-white p-6 rounded-lg w-full max-w-md dark:text-gray-100 text-black"
                            style={{ zIndex: 21 }}
                        >
                            <h3 className="text-lg font-semibold mb-4">{goalForm.id ? 'Edit Goal' : 'Add Goal'}</h3>
                            <form onSubmit={handleGoalSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <motion.input
                                        type="text"
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={goalForm.title}
                                        onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <motion.textarea
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={goalForm.description}
                                        onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <motion.select
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={goalForm.type}
                                        onChange={(e) => setGoalForm({ ...goalForm, type: e.target.value })}
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
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={goalForm.targetDate}
                                        onChange={(e) => setGoalForm({ ...goalForm, targetDate: e.target.value })}
                                        min={currentDateString}
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <motion.select
                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded p-2"
                                        value={goalForm.status}
                                        onChange={(e) => setGoalForm({ ...goalForm, status: e.target.value })}
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
                                        className="dark:text-gray-400 text-gray-700 font-semibold"
                                        onClick={() => setIsGoalModalOpen(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="bg-green-500 text-white px-4 py-2 rounded dark:hover:bg-green-600 hover:bg-green-600"
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