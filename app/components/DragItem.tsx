// DragItem.tsx
import React from "react";
import { useDrag } from "react-dnd";

interface DragItemProps {
  name: string;
  type: string;
  extraInfo?: string;
  disabled?: boolean;
}

const ITEM_TYPES = {
  AUDIENCE: "audience",
  CHANNEL: "channel",
};

const DragItem: React.FC<DragItemProps> = ({ name, type, extraInfo, disabled = false }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { name, type },
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-3 rounded transition relative flex flex-row justify-between
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${disabled 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60" 
          : type === ITEM_TYPES.AUDIENCE 
            ? "bg-blue-100 border-l-4 border-blue-500 text-blue-800 cursor-grab hover:bg-blue-200" 
            : "bg-red-100 border-l-4 border-red-500 text-red-800 cursor-grab hover:bg-red-200"
        }
      `}
    >
      <div className="font-medium">{name}</div>
      {extraInfo && (
        <div className="text-lg mt-0 opacity-80">{extraInfo}</div>
      )}
      {disabled && (
        <div className="absolute top-3 right-1 text-xs text-red-500 font-bold">
          Not enough budget
        </div>
      )}
    </div>
  );
};

export default DragItem;