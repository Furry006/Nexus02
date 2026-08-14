import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';

interface ChannelCategoryProps {
  title: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onAddChannel?: () => void;
}

export const ChannelCategory: React.FC<ChannelCategoryProps> = ({
  title,
  isCollapsed = false,
  onToggleCollapse,
  onAddChannel,
}) => {
  return (
    <div className="flex items-center justify-between px-2 mb-1 mt-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider select-none group">
      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-1 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${
            isCollapsed ? '-rotate-90 text-zinc-600' : ''
          }`}
        />
        <span>{title}</span>
      </button>

      <button
        onClick={onAddChannel}
        title="Create Channel"
        className="text-zinc-500 hover:text-zinc-200 transition-colors p-0.5 rounded cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
