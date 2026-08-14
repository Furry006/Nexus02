import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserPlus, Settings, PlusCircle, Bell, Shield, Check } from 'lucide-react';
import type { WorkspaceData } from './mockData';

interface WorkspaceHeaderProps {
  workspace: WorkspaceData;
  onCreateChannel?: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspace,
  onCreateChannel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative border-b border-zinc-800/40 flex-shrink-0" ref={dropdownRef}>
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 flex items-center justify-between text-left font-semibold text-zinc-100 text-sm hover:bg-zinc-800/40 transition-colors duration-150 focus:outline-none cursor-pointer group"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="truncate tracking-tight font-sans text-[14.5px]">
            {workspace.name}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            PRO
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-zinc-100' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-13 left-2 right-2 z-50 bg-[#16161c] border border-zinc-800/90 rounded-lg shadow-xl shadow-black/80 py-1.5 text-xs text-zinc-300 animate-in fade-in duration-100">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-purple-600 hover:text-white transition-colors duration-100 font-medium text-purple-300"
          >
            <div className="flex items-center gap-2">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite People</span>
            </div>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onCreateChannel?.();
            }}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors duration-100"
          >
            <div className="flex items-center gap-2">
              <PlusCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Create Channel</span>
            </div>
          </button>

          <div className="my-1 border-t border-zinc-800/80" />

          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors duration-100"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-zinc-400" />
              <span>Workspace Settings</span>
            </div>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors duration-100"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-zinc-400" />
              <span>Notification Settings</span>
            </div>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors duration-100"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>Privacy & Safety</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
