"use client";
import React from 'react'
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const DndContext = ({
  children,
  onDragEnd,
}: {
  children: React.ReactNode;
  onDragEnd: (result: DropResult) => void;
}) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}

export default DndContext