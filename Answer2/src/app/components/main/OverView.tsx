'use client';

import { useState, useEffect } from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    status: string;
    created_at: string;
    updated_at: string;
};

export default function MainOverView() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [dueDate, setDueDate] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async () => {
        if (!title || !description || !dueDate) return alert('Please fill all fields');

        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return alert('Due date cannot be in the past');
        }

        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                priority,
                due_date: dueDate,
                status: 'pending',
            }),
        });

        if (res.ok) {
            alert('Task created!');
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Normal');
            fetchTasks();
        } else {
            alert('Failed to create task');
        }
    };

    const updateTask = async (id: number, updatedFields: Partial<Task>) => {
        await fetch(`/api/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        });
        fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });
        fetchTasks();
    };

    const renderTaskCard = (task: Task) => (
        <div
            key={task.id}
            className="bg-gray-100 p-3 my-2 rounded shadow flex flex-col items-start"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('id', task.id.toString())}
        >
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs text-gray-500">
                Due: {new Date(task.due_date).toISOString().split('T')[0]}
            </p>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => updateTask(task.id, { status: 'done' })}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                    Submit
                </button>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    const renderDropZone = (label: string, color: string, priorityLevel: string) => (
        <div
            onDrop={(e) => {
                const id = Number(e.dataTransfer.getData('id'));
                updateTask(id, { priority: priorityLevel });
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className={`flex items-center justify-center gap-2 text-${color}-500`}>
                <span className={`w-2 h-2 bg-${color}-500 rounded-full`}></span>
                {label}
            </div>
            <div className="mt-2 max-h-[320px] overflow-y-auto pr-1">
                {tasks
                .filter((t) => t.priority === priorityLevel && t.status === 'pending')
                .map(renderTaskCard)}
            </div>
            
        </div>
    );

    return (
        // Create Task 
        <main className="flex-1 p-6 space-y-6 max-w-screen-xl mx-auto min-h-screen gap-6 min-h-screen"

        >
            {/* Create Task Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Create tasks</h2>
                    {/* title */}
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        placeholder="Title name tasks"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/*  */}
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        placeholder="Description tasks"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        className="w-full mb-2 p-2 border rounded"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option>Normal</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <input
                        type="date"
                        className="w-full p-2 border rounded mb-2"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600 transition"
                    >
                        Add Task
                    </button>
                </div>

                {/* Tasks to be done */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-2">
                        Tasks to be done
                        <span className="ml-2 text-sm text-gray-500">
                            ({tasks.filter(t => t.status === 'done').length} done)
                        </span>
                    </h2>
                    <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
                        {tasks
                            .filter((task) => task.status === 'done')
                            .map((task) => (
                                <div key={task.id} className="bg-gray-100 p-3 my-2 rounded shadow flex flex-col items-start">
                                    <h3 className="font-bold">{task.title}</h3>
                                    <p className="text-sm text-gray-700">{task.description}</p>
                                    <p className="text-xs text-gray-500">
                                        Priority: {task.priority} | Due: {new Date(task.due_date,).toISOString().split('T')[0]}
                                    </p>
                                    <button onClick={() => deleteTask(task.id)}
                                        className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                    </ul>
                </div>
                
                {/* Tasks Summary */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Tasks</span>
                            <span className="font-semibold">{tasks.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-green-600 font-medium">✅ Done</span>
                            <span>{tasks.filter(t => t.status === 'done').length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-red-500 font-medium">⏳ Pending</span>
                            <span>{tasks.filter(t => t.status === 'pending').length}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Priority Section */}
            <section className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-center mb-4">
                    <div className="text-lg font-semibold">Tasks Overview</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-4">
                    {renderDropZone('High', 'red', 'High')}
                    {renderDropZone('Medium', 'yellow', 'Medium')}
                    {renderDropZone('Normal', 'green', 'Normal')}
                </div>
            </section>
        </main>
    );
}
