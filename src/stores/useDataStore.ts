import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_DATA } from '@/lib/mockData';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  rows: number;
  columns: number;
  uploaded_at: string;
  status: 'uploaded' | 'enriching' | 'complete' | 'error';
  enrichment_status?: 'none' | 'pending' | 'completed' | 'failed';
  enriched_at?: string;
  preview?: any[];
}

interface DataStore {
  // State
  uploadedFiles: UploadedFile[];
  currentFileId: string | null;
  isUploading: boolean;

  // Actions
  addFile: (file: UploadedFile) => void;
  removeFile: (fileId: string) => void;
  updateFileStatus: (fileId: string, status: UploadedFile['status']) => void;
  setCurrentFile: (fileId: string | null) => void;
  setUploading: (isUploading: boolean) => void;
  clearFiles: () => void;
}

// Convert demo files to store format
const demoFiles: UploadedFile[] = DEMO_DATA.files.map((f) => ({
  id: f.id,
  name: f.name,
  size: f.recordCount * 150, // Approximate size
  rows: f.recordCount,
  columns: 12,
  uploaded_at: f.uploadDate,
  status: 'complete' as const,
  enrichment_status: 'completed' as const,
  enriched_at: f.uploadDate,
}));

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      // Initial state - pre-loaded with demo files
      uploadedFiles: demoFiles,
      currentFileId: demoFiles[0]?.id || null,
      isUploading: false,

      // Actions
      addFile: (file) =>
        set((state) => ({
          uploadedFiles: [...state.uploadedFiles, file],
          currentFileId: file.id,
        })),

      removeFile: (fileId) =>
        set((state) => ({
          uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileId),
          currentFileId: state.currentFileId === fileId ? null : state.currentFileId,
        })),

      updateFileStatus: (fileId, status) =>
        set((state) => ({
          uploadedFiles: state.uploadedFiles.map((f) => (f.id === fileId ? { ...f, status } : f)),
        })),

      setCurrentFile: (fileId) => set({ currentFileId: fileId }),

      setUploading: (isUploading) => set({ isUploading }),

      clearFiles: () => set({ uploadedFiles: demoFiles, currentFileId: demoFiles[0]?.id || null }),
    }),
    {
      name: 'jengu-demo-data-storage',
    }
  )
);
