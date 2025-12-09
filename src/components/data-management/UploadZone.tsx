import React, { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Card, Button } from '../ui'
import clsx from 'clsx'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    dropFiles: 'Drop your files here, or click to browse',
    supportedFormats: 'Supported formats: CSV, Excel (.xlsx, .xls)',
    selectFiles: 'Select Files',
  },
  fr: {
    dropFiles: 'Déposez vos fichiers ici, ou cliquez pour parcourir',
    supportedFormats: 'Formats acceptés : CSV, Excel (.xlsx, .xls)',
    selectFiles: 'Sélectionner des Fichiers',
  },
}

interface UploadZoneProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card variant="elevated" data-tour="upload-zone">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={clsx(
          'cursor-pointer rounded-xl border-2 border-dashed p-12 transition-all duration-200',
          isDragging
            ? 'scale-[1.02] border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-elevated/50'
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,.xlsx,.xls"
          onChange={onFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="mb-1 text-lg font-semibold text-text">
              {t.dropFiles}
            </h3>
            <p className="text-sm text-muted">{t.supportedFormats}</p>
          </div>
          <Button variant="primary" size="lg">
            {t.selectFiles}
          </Button>
        </div>
      </div>
    </Card>
  )
}
