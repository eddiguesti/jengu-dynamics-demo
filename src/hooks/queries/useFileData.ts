import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/stores/useToastStore';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_DATA, simulateDelay } from '@/lib/mockData';

// Query keys factory
export const fileKeys = {
  all: ['files'] as const,
  lists: () => [...fileKeys.all, 'list'] as const,
  list: (filters?: string) => [...fileKeys.lists(), { filters }] as const,
  details: () => [...fileKeys.all, 'detail'] as const,
  detail: (id: string) => [...fileKeys.details(), id] as const,
  data: (id: string, limit?: number) => [...fileKeys.detail(id), 'data', limit] as const,
};

/**
 * Fetch all uploaded files metadata - DEMO VERSION
 */
export function useUploadedFiles() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: fileKeys.lists(),
    queryFn: async () => {
      await simulateDelay(400);
      return DEMO_DATA.files;
    },
    enabled: isAuthenticated,
  });
}

/**
 * Fetch file data (pricing rows) - DEMO VERSION
 */
export function useFileData(fileId: string, limit: number = 10000) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: fileKeys.data(fileId, limit),
    queryFn: async () => {
      await simulateDelay(500);
      // Return subset of pricing data
      return DEMO_DATA.pricingData.slice(0, limit);
    },
    enabled: !!fileId && isAuthenticated,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Upload file mutation - DEMO VERSION
 */
export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      await simulateDelay(1500);
      return {
        file: {
          id: 'demo-file-' + Date.now(),
          name: file.name,
          uploadDate: new Date().toISOString(),
          recordCount: Math.floor(Math.random() * 500) + 100,
          status: 'processed',
          enrichmentStatus: 'complete',
          rows: Math.floor(Math.random() * 500) + 100,
        },
      };
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });

      if (response?.file) {
        toast.success(
          'Upload successful!',
          `${response.file.rows?.toLocaleString() || 'Your'} rows uploaded. Demo data has been loaded.`
        );
      }
    },
    onError: (error: Error) => {
      toast.error('Upload failed', error.message || 'Please try again');
    },
  });
}

/**
 * Delete file mutation - DEMO VERSION
 */
export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) => {
      await simulateDelay(400);
      return { success: true, fileId };
    },
    onSuccess: (_, fileId) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.removeQueries({ queryKey: fileKeys.detail(fileId) });
      queryClient.removeQueries({ queryKey: fileKeys.data(fileId) });
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
      toast.success('File deleted', 'The file has been removed (demo mode)');
    },
  });
}

/**
 * Enrich file with weather/holiday data - DEMO VERSION
 */
export function useEnrichFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileId,
    }: {
      fileId: string;
      latitude: number;
      longitude: number;
      country: string;
    }) => {
      await simulateDelay(1000);
      return { status: 'completed', fileId };
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.data(variables.fileId) });
      queryClient.invalidateQueries({ queryKey: fileKeys.detail(variables.fileId) });
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      // Toast disabled for demo - enrichment happens silently
    },
    onError: (error: Error) => {
      toast.error('Enrichment failed', error.message || 'Please try again');
    },
  });
}
