import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(todo);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();

  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.todo.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
