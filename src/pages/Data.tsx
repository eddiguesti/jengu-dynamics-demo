import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDataStore, useBusinessStore } from '../stores'
import { spring, pageVariants } from '@/lib/motion'
import {
  useUploadedFiles,
  useUploadFile,
  useEnrichFile,
  useDeleteFile,
} from '../hooks/queries/useFileData'
import { ColumnMappingModal } from '../components/data/ColumnMappingModal'
import { showPremiumModal } from '../components/ui/PremiumModal'
import apiClient from '../lib/api/client'

// Import extracted components
import {
  UploadedFile,
  EnrichmentFeature,
  Step,
  DEFAULT_ENRICHMENT_FEATURES,
  StepIndicator,
  UploadZone,
  FileList,
  DataPreview,
  DataRequirements,
  EnrichmentStep,
  PMSIntegration,
} from '../components/data-management'

export const Data = () => {
  const { uploadedFiles: zustandFiles, addFile, removeFile: removeFromZustand } = useDataStore()
  const { profile } = useBusinessStore()
  const [currentStep, setCurrentStep] = useState<Step>('upload')

  // React Query hooks
  const { data: uploadedFiles = [] } = useUploadedFiles()
  const uploadFileMutation = useUploadFile()
  const enrichFileMutation = useEnrichFile()
  const deleteFileMutation = useDeleteFile()

  // Upload State
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Column Mapping State
  const [mappingModal, setMappingModal] = useState<{
    isOpen: boolean
    propertyId?: string
    fileName?: string
    detectedColumns?: string[]
    autoMapping?: Record<string, string | null>
    missingFields?: string[]
  }>({
    isOpen: false,
  })

  // Enrichment State
  const [features, setFeatures] = useState<EnrichmentFeature[]>(DEFAULT_ENRICHMENT_FEATURES)
  const [isEnriching, setIsEnriching] = useState(false)

  // Load persisted files on mount AND check enrichment status
  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      const restoredFiles: UploadedFile[] = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: 'text/csv',
        status: 'success',
        rows: file.rows,
        columns: file.columns,
        preview: file.preview || [],
        uniqueId: file.id,
      }))
      setFiles(restoredFiles)
      console.log('✅ Restored', uploadedFiles.length, 'files from database')

      const enrichmentStatuses = uploadedFiles.map(file => file.enrichment_status)
      const allEnriched =
        uploadedFiles.length > 0 && enrichmentStatuses.every(status => status === 'completed')

      if (allEnriched) {
        console.log('✅ All files already enriched - marking features as complete')
        setFeatures(prev => {
          const allComplete = prev.every(f => f.status === 'complete' && f.progress === 100)
          if (allComplete) return prev
          return prev.map(f => ({ ...f, status: 'complete', progress: 100 }))
        })
      } else if (uploadedFiles.length > 0) {
        console.log('ℹ️  Files not enriched - resetting enrichment features')
        setFeatures(prev => {
          const allIdle = prev.every(f => f.status === 'idle' && f.progress === 0)
          if (allIdle) return prev
          return prev.map(f => ({ ...f, status: 'idle', progress: 0 }))
        })
      }
    } else {
      setFeatures(prev => {
        const allIdle = prev.every(f => f.status === 'idle' && f.progress === 0)
        if (allIdle) return prev
        console.log('ℹ️  No files loaded - resetting enrichment features')
        return prev.map(f => ({ ...f, status: 'idle', progress: 0 }))
      })
    }
  }, [uploadedFiles])

  // === UPLOAD HANDLERS ===
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }

  const processFiles = async (fileList: File[]) => {
    const timestamp = Date.now()
    const newFiles: UploadedFile[] = fileList.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      uniqueId: `${file.name}-${file.size}-${timestamp}-${index}`,
    }))

    setFiles(prev => [...prev, ...newFiles])

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index]
      const uniqueId = `${file.name}-${file.size}-${timestamp}-${index}`

      try {
        setFiles(prev =>
          prev.map(f => (f.uniqueId === uniqueId ? { ...f, status: 'processing' } : f))
        )

        console.log(`📤 Uploading ${file.name} to backend...`)
        const response = await uploadFileMutation.mutateAsync(file)

        if (response.requiresMapping) {
          console.log(`🔧 Manual column mapping required for ${file.name}`)
          setMappingModal({
            isOpen: true,
            propertyId: response.propertyId,
            fileName: response.fileName,
            detectedColumns: response.detectedColumns,
            autoMapping: response.autoMapping,
            missingFields: response.missingFields,
          })
          return
        }

        const uploadedFile = response.file
        console.log(
          `✅ Uploaded ${file.name}: ${uploadedFile.rows} rows, ${uploadedFile.columns} columns`
        )

        setFiles(prev =>
          prev.map(f =>
            f.uniqueId === uniqueId
              ? {
                  ...f,
                  status: 'success',
                  rows: uploadedFile.rows,
                  columns: uploadedFile.columns,
                  preview: uploadedFile.preview,
                }
              : f
          )
        )

        addFile({
          id: uploadedFile.id,
          name: uploadedFile.name,
          size: uploadedFile.size,
          rows: uploadedFile.rows,
          columns: uploadedFile.columns,
          uploaded_at: uploadedFile.uploaded_at,
          status: 'complete',
          preview: uploadedFile.preview,
        })
      } catch (error) {
        console.error(`❌ Failed to upload ${file.name}:`, error)
        setFiles(prev => prev.map(f => (f.uniqueId === uniqueId ? { ...f, status: 'error' } : f)))
      }

      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }

  const removeFile = async (_uniqueId: string) => {
    // In demo mode, show premium modal instead of deleting
    showPremiumModal('Deleting uploaded files')
  }

  const handleManualMapping = async (columnMapping: Record<string, string | null>) => {
    const { propertyId, fileName } = mappingModal
    if (!propertyId) return

    try {
      console.log(`🔧 Submitting manual column mapping for ${fileName}...`)
      const response = await apiClient.post(`/files/${propertyId}/map-columns`, { columnMapping })
      const uploadedFile = response.data.file

      console.log(`✅ Manual mapping successful: ${uploadedFile.rows} rows processed`)

      setFiles(prev =>
        prev.map(f =>
          f.name === fileName
            ? {
                ...f,
                status: 'success',
                rows: uploadedFile.rows,
                preview: uploadedFile.preview,
                uniqueId: uploadedFile.id,
              }
            : f
        )
      )

      addFile({
        id: uploadedFile.id,
        name: fileName || '',
        size: 0,
        rows: uploadedFile.rows,
        columns: 0,
        uploaded_at: new Date().toISOString(),
        status: 'complete',
        preview: uploadedFile.preview,
      })

      setMappingModal({ isOpen: false })
    } catch (error: any) {
      console.error(`❌ Manual mapping failed:`, error)
      alert(`Failed to process manual mapping: ${error.message}`)
    }
  }

  // === ENRICHMENT HANDLERS ===
  const startEnrichment = async (featureId?: string) => {
    setIsEnriching(true)
    const featuresToRun = featureId ? features.filter(f => f.id === featureId) : features

    for (const feature of featuresToRun) {
      setFeatures(prev =>
        prev.map(f => (f.id === feature.id ? { ...f, status: 'running', progress: 0 } : f))
      )

      try {
        if (feature.id === 'weather') {
          await enrichWithRealWeather(feature.id)
        } else if (feature.id === 'holidays') {
          await enrichWithRealHolidays(feature.id)
        } else {
          await enrichFeatureSimulated(feature.id)
        }

        setFeatures(prev =>
          prev.map(f => (f.id === feature.id ? { ...f, status: 'complete', progress: 100 } : f))
        )
      } catch (error) {
        console.error(`Error enriching ${feature.id}:`, error)
        setFeatures(prev =>
          prev.map(f => (f.id === feature.id ? { ...f, status: 'error', progress: 0 } : f))
        )
      }
    }

    setIsEnriching(false)
  }

  const enrichWithRealWeather = async (featureId: string) => {
    if (!profile?.location) {
      throw new Error('Business location not set. Please configure in Settings.')
    }

    const { latitude, longitude, country } = profile.location

    if (uploadedFiles.length === 0 && zustandFiles.length === 0) {
      throw new Error('No uploaded files found')
    }

    const fileId = uploadedFiles[0]?.id || zustandFiles[0]?.id
    const rowCount = uploadedFiles[0]?.rows || zustandFiles[0]?.rows || 1000
    const estimatedDurationMs = Math.max(60000, rowCount * 30)

    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 0.5
      if (progress <= 95) {
        setFeatures(prev => prev.map(f => (f.id === featureId ? { ...f, progress } : f)))
      }
    }, estimatedDurationMs / 200)

    try {
      console.log(`📤 Requesting weather enrichment for file ${fileId}...`)
      const response = await enrichFileMutation.mutateAsync({
        fileId,
        latitude,
        longitude,
        country,
      })

      clearInterval(progressInterval)
      setFeatures(prev => prev.map(f => (f.id === featureId ? { ...f, progress: 100 } : f)))
      console.log(`✅ Weather enrichment complete:`, response.results)
      return response
    } catch (error) {
      clearInterval(progressInterval)
      console.error('Weather enrichment failed:', error)
      throw error
    }
  }

  const enrichWithRealHolidays = async (featureId: string) => {
    console.log('ℹ️ Holiday enrichment is handled automatically by the backend')

    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 10
      if (progress <= 100) {
        setFeatures(prev => prev.map(f => (f.id === featureId ? { ...f, progress } : f)))
      }
    }, 100)

    await new Promise(resolve => setTimeout(resolve, 1000))

    clearInterval(progressInterval)
    setFeatures(prev => prev.map(f => (f.id === featureId ? { ...f, progress: 100 } : f)))
    console.log('✅ Holiday enrichment marked as complete (handled by backend)')
  }

  const enrichFeatureSimulated = async (featureId: string) => {
    return new Promise<void>(resolve => {
      const duration = 2000
      const interval = 200
      const steps = duration / interval

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = Math.round((currentStep / steps) * 100)

        setFeatures(prev =>
          prev.map(f => (f.id === featureId ? { ...f, progress: Math.min(100, progress) } : f))
        )

        if (currentStep >= steps) {
          clearInterval(timer)
          resolve()
        }
      }, interval)
    })
  }

  const handleEnrichmentComplete = () => {
    console.log('✅ Enrichment completed - refreshing data')
    setFeatures(prev => prev.map(f => ({ ...f, status: 'complete', progress: 100 })))
  }

  const handleEnrichmentError = (error: string) => {
    console.error('❌ Enrichment error:', error)
    setFeatures(prev => prev.map(f => ({ ...f, status: 'error', progress: 0 })))
  }

  // === COMPUTED VALUES ===
  const hasSuccessfulUpload = files.some(f => f.status === 'success')
  const allEnrichmentComplete = features.every(f => f.status === 'complete')

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text">Gestion des Données</h1>
        <p className="mt-2 text-muted">Importez et enrichissez vos données de réservation historiques</p>

        <StepIndicator
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          hasSuccessfulUpload={hasSuccessfulUpload}
          allEnrichmentComplete={allEnrichmentComplete}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* === UPLOAD STEP === */}
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={spring.default}
            className="space-y-6"
          >
            {/* Import Options - CSV Upload OR PMS Integration */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <UploadZone
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileSelect={handleFileSelect}
              />
              <PMSIntegration />
            </div>

            <FileList
              files={files}
              uploadedFilesFromDB={uploadedFiles}
              onRemoveFile={removeFile}
            />

            {hasSuccessfulUpload && (
              <DataPreview
                files={files}
                uploadedFilesFromDB={uploadedFiles}
                onContinue={() => setCurrentStep('enrichment')}
              />
            )}

            <DataRequirements />
          </motion.div>
        )}

        {/* === ENRICHMENT STEP === */}
        {currentStep === 'enrichment' && (
          <EnrichmentStep
            features={features}
            isEnriching={isEnriching}
            hasLocation={!!profile?.location}
            uploadedFileId={uploadedFiles?.[0]?.id}
            onStartEnrichment={startEnrichment}
            onEnrichmentComplete={handleEnrichmentComplete}
            onEnrichmentError={handleEnrichmentError}
          />
        )}
      </AnimatePresence>

      {/* Column Mapping Modal */}
      <ColumnMappingModal
        isOpen={mappingModal.isOpen}
        onClose={() => setMappingModal({ isOpen: false })}
        detectedColumns={mappingModal.detectedColumns || []}
        missingFields={mappingModal.missingFields || []}
        autoMapping={mappingModal.autoMapping || {}}
        onSubmit={handleManualMapping}
      />
    </motion.div>
  )
}
