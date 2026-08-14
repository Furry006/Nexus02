import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { workspaceApi } from '../../lib/api';
import { toast } from 'sonner';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommunityCreated: (community: { id: string; name: string; description?: string }) => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  onClose,
  onCommunityCreated,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const response = await workspaceApi.createWorkspace({
        name: name.trim(),
        description: description.trim() || undefined,
      });

      const newWsData = response?.data || response?.result || response;
      toast.success(`Community "${name}" created successfully!`);

      onCommunityCreated({
        id: newWsData?.id || `c-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
      });

      setName('');
      setDescription('');
      onClose();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to create community.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#121216] border border-zinc-800/90 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded-lg hover:bg-zinc-800/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Create Community</h2>
            <p className="text-xs text-zinc-400">Build a hub for developers to discuss code & projects.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="comm-name" className="block text-xs font-medium text-zinc-300">
              Community Name <span className="text-purple-400">*</span>
            </label>
            <input
              id="comm-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Open Source India"
              className="w-full h-10 px-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="comm-desc" className="block text-xs font-medium text-zinc-300">
              Description <span className="text-zinc-500">(Optional)</span>
            </label>
            <input
              id="comm-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Discussing open-source contributions"
              className="w-full h-10 px-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="h-9 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create Community</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
