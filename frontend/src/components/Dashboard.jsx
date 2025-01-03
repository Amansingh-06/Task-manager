import React, { useState, useEffect } from 'react';

const Dashboard = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        dueDate: '',
    });
    const [editingTask, setEditingTask] = useState(null); // Track the task being edited

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://task-manager-5-cmv8.onrender.com/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setTasks([]);
            }
        };

        if (token) fetchTasks();
    }, [token]);

    const addTask = async () => {
        try {
            const response = await fetch('https://task-manager-5-cmv8.onrender.com/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                    status: newTask.status,
                    priority: newTask.priority,
                    dueDate: newTask.dueDate,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setTasks((prev) => [...prev, data]);
                setNewTask({ title: '', description: '', status: 'pending', priority: 'low', dueDate: '' });
            } else {
                console.error('Error adding task:', data);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async () => {
        if (!editingTask) return;
        try {
            const response = await fetch(`https://task-manager-1-0qge.onrender.com/api/tasks/${editingTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                    status: newTask.status,
                    priority: newTask.priority,
                    dueDate: newTask.dueDate,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setTasks((prev) =>
                    prev.map((task) =>
                        task._id === editingTask._id
                            ? { ...task, ...newTask }
                            : task
                    )
                );
                setEditingTask(null);
                setNewTask({ title: '', description: '', status: 'pending', priority: 'low', dueDate: '' });
            } else {
                console.error('Error updating task:', data);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`https://task-manager-5-cmv8.onrender.com/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setTasks((prev) => prev.filter((task) => task._id !== taskId));
            } else {
                console.error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 rounded mr-2"
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="border p-2 rounded mr-2"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="border p-2 rounded mr-2"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="datetime-local"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="border p-2 rounded mr-2"
                />
                {editingTask ? (
                    <button onClick={updateTask} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Task
                    </button>
                ) : (
                    <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Task
                    </button>
                )}
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(task)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
