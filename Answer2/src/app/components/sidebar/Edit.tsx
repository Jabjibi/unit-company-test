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

export default function HistoryEdit() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Task>>({});

  const fetchTasks = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTasks(data);
  };

  const updateTask = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditingId(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-6 min-h-screen flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Edit Task History
        </h1>

        {/* scroll*/}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-100 p-4 rounded shadow">
              {editingId === task.id ? (
                <div className="space-y-2">
                  <input
                    className="w-full border p-2 rounded"
                    defaultValue={task.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                  <textarea
                    className="w-full border p-2 rounded"
                    defaultValue={task.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                  <select
                    className="w-full border p-2 rounded"
                    defaultValue={task.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option>Normal</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    defaultValue={task.due_date.split('T')[0]}
                    onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                  />
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg">{task.title}</div>
                    <div className="text-sm text-gray-700">{task.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Priority: {task.priority} | Due: {task.due_date.split('T')[0]}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setForm(task);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
