'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: number
  title: string
  description: string
  due_date: string
  priority: string
  status: string
}

export default function DonePage() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTasks(data.filter((t: Task) => t.status === 'done'))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const renderTaskGroup = (label: string, color: string, priority: string) => {
    const filtered = tasks.filter((task) => task.priority === priority)

    const colorClass = {
      High: 'text-red-500',
      Medium: 'text-yellow-500',
      Normal: 'text-green-500',
    }[priority];
    return (
      <div className="bg-white p-4 rounded-xl shadow-md min-h-[300px] flex flex-col">
        <h2 className={`text-lg font-semibold mb-2 ${colorClass}`}>
          {label} Priority
        </h2>
        <div className="flex-1 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-sm italic">
              No completed tasks in this category.
            </p>
          ) : (
            filtered.map((task) => (
              <div key={task.id} className="bg-gray-100 rounded shadow">
                <div className="font-bold">{task.title}</div>
                <div className="text-sm">{task.description}</div>
                <div className="text-xs text-gray-500">
                  Due: {new Date(task.due_date).toISOString().split('T')[0]}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="p-6 min-h-screen space-y-6 max-w-screen-xl mx-auto">

      <h1 className="text-3xl font-bold text-back text-center">Completed Tasks</h1>

      <div className="bg-white p-3 rounded-xl shadow flex gap-6 text-sm text-gray-700">
        <span>🔴 High: {tasks.filter(t => t.priority === 'High').length}</span>
        <span>🟡 Medium: {tasks.filter(t => t.priority === 'Medium').length}</span>
        <span>🟢 Normal: {tasks.filter(t => t.priority === 'Normal').length}</span>
        <span>🧾 Total: {tasks.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {renderTaskGroup('High', 'red', 'High')}
        {renderTaskGroup('Medium', 'yellow', 'Medium')}
        {renderTaskGroup('Normal', 'green', 'Normal')}
      </div>
    </main>
  )
}
