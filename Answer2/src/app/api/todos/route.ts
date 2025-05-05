// src/app/api/todos/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// JSDoc annotations
// จะทำการดึงข้อมูลในส่วนนี้ไปแสดงใน Swagger UI
// สิ่งที่เอามาแสดง 

// // GET /api/todos/{id} → ดึง task by id

// PUT /api/todos/{id} → แก้ไข task by id

// DELETE /api/todos/{id} → ลบ task by id

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all tasks
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *   post:
 *     summary: Create a new task
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTodo'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   put:
 *     summary: Update a task by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTodo'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
export async function POST(req: Request) {
  const data = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      due_date: new Date(data.due_date),
      priority: data.priority,
      status: data.status || 'pending',
    },
  });

  return NextResponse.json(todo, { status: 201 });
}

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { created_at: 'desc' },
  });
  return NextResponse.json(todos);
}
