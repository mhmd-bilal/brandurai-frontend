// DropZone.tsx
import React from "react";
import { useDrop } from "react-dnd";

const ITEM_TYPES = {
  AUDIENCE: "audience",
  CHANNEL: "channel",
};

interface DroppedItem {
  id: string;
  name: string;
  type: string;
  zoneId: number;
}

interface DropZoneProps {
  id: number;
  onDrop: (item: { name: string, type: string }, zoneId: number) => void;
  onRemoveItem: (id: string) => void;
  droppedItems: DroppedItem[];
  acceptType: string;
  item?: DroppedItem;
}

const DropZone: React.FC<DropZoneProps> = ({ id, onDrop, onRemoveItem, acceptType, item }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (droppedItem: { name: string, type: string }) => {
      console.log("Dropped Item:", droppedItem, "in zone:", id);
      onDrop(droppedItem, id);
      return { zoneId: id };
    },
    canDrop: (droppedItem: { type: string }) => {
      return !item && droppedItem.type === acceptType;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [id, item, acceptType]);

  return (
    <div
      ref={drop}
      className={`h-20 w-full rounded flex items-center justify-center transition ${
        item 
          ? acceptType === ITEM_TYPES.AUDIENCE 
            ? "bg-blue-200 border-2 border-dashed  border-blue-500" 
            : "bg-red-200 border-2 border-dashed  border-red-500"
          : isOver && canDrop
            ? "bg-green-100 border-2 border-green-500"
            : isOver && !canDrop
              ? "bg-red-100 border-2 border-red-500"
              : acceptType === ITEM_TYPES.AUDIENCE
                ? "bg-blue-50 border-2 border-dashed  border-blue-300"
                : "bg-red-50 border-2 border-dashed  border-red-300"
      }`}
    >
      {item ? (
        <div className="p-2 w-full flex flex-row gap-2 justify-between px-10 items-center ">
          <div className="text-center text-xl text-black">
            {item.name}
          </div>
          <div className="flex justify-center mt-1">
            <button 
              onClick={() => onRemoveItem(item.id)}
              className="text-lg h-8 w-8 bg-red-500 text-white px-2 pt-0 pb-1 rounded hover:bg-red-700"
            >
              x
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col gap-0 justify-center items-center">
          <span className="text-gray-600 text-xl">
            {acceptType === ITEM_TYPES.AUDIENCE ? "Drop Audience Here" : "Drop Ad Channel Here"}
          </span>
          <div className="text-md text-gray-500">
            {acceptType === ITEM_TYPES.AUDIENCE ? "Who to target?" : "How to reach them?"}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;