"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { reorderSections } from "@/redux/slices/addSectionSlice";
import { Lock } from "lucide-react";
import Image from "next/image";
import Add from "media/builderIcons/add.svg";
import { CgClose } from "react-icons/cg";
import LoadingSkeleton from "@/components/loadingSkeleton/loadingSkeleton";

type propsType = {
  doubleColumn?: boolean | string;
};


const DndExample = ({ doubleColumn }: propsType) => {
  const dispatch = useDispatch();
  const addedSections = useSelector(
    (state: any) => state.addSection.addedSections
  );

  const rightSideSections = ["Technical Skills", "Soft Skills", "Languages", "References"];
  const leftSections = addedSections?.filter((section: any) => !rightSideSections.includes(section?.name));
  const rightSections = addedSections?.filter((section: any) => rightSideSections.includes(section?.name));


  const mid = Math.ceil(addedSections.length / 2);
  const cards = [
    { id: "left", components: leftSections },
    { id: "right", components: rightSections },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    // Prevent moving between left/right columns
    if (sourceCol !== destCol) return;

    const updatedSections: any = [...addedSections];

    // Get actual section arrays based on column
    const targetGroup =
      sourceCol === "left"
        ? addedSections.filter((section: any) => !rightSideSections.includes(section.name))
        : addedSections.filter((section: any) => rightSideSections.includes(section.name));

    const startIdx = addedSections.findIndex((s: any) => s.id === targetGroup[source.index]?.id);
    const endIdx = addedSections.findIndex((s: any) => s.id === targetGroup[destination.index]?.id);

    if (startIdx === -1 || endIdx === -1) return;

    const [removed] = updatedSections.splice(startIdx, 1);
    updatedSections.splice(endIdx, 0, removed);

    dispatch(reorderSections(updatedSections));
  };
  // old middle work end

  if (!addedSections.length) return <LoadingSkeleton />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`grid ${doubleColumn
          ? "grid-cols-2 gap-4"
          : "grid-cols-1"
          }`}
      >
        {cards.map((col) => (
          <Droppable
            key={col.id}
            droppableId={col.id}
            type="ITEM"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {col.components.map((component: any, index: any) => (
                  <Draggable
                    key={component.id.toString()}
                    draggableId={component.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...(!component.locked
                          ? {
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                          }
                          : {})}
                        className={`bg-gray-200 border rounded-lg p-3 my-2 text-center text-[14px] flex items-center justify-between ${component.locked
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-[#9885FF] hover:text-white"
                          }`}
                      >
                        {component.locked ? (
                          <Lock size={18} className="text-slate-800" />
                        ) : (
                          <Image
                            src={Add}
                            alt="Add"
                            width={16}
                          />
                        )}
                        {component.name}
                        {!component.locked && <CgClose />}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DndExample;
