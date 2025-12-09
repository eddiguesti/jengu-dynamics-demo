import React from 'react'
import { FileText, CheckCircle2, AlertCircle, X, Clock, Sparkles } from 'lucide-react'
import { Card, Badge } from '../ui'
import { UploadedFile, formatFileSize } from './types'
import { useLanguageStore } from '@/stores/useLanguageStore'

const translations = {
  en: {
    uploadedFiles: 'Uploaded Files',
    files: 'file(s)',
    rows: 'rows',
    columns: 'columns',
    enriched: 'Enriched',
    enriching: 'Enriching...',
    failed: 'Failed',
  },
  fr: {
    uploadedFiles: 'Fichiers Importés',
    files: 'fichier(s)',
    rows: 'lignes',
    columns: 'colonnes',
    enriched: 'Enrichi',
    enriching: 'Enrichissement...',
    failed: 'Échoué',
  },
}

interface FileListProps {
  files: UploadedFile[]
  uploadedFilesFromDB: Array<{ id: string; enrichment_status?: string }>
  onRemoveFile: (uniqueId: string) => void
}

const getStatusIcon = (status: UploadedFile['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-success" />
    case 'error':
      return <AlertCircle className="h-5 w-5 text-error" />
    case 'processing':
      return (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )
    default:
      return <FileText className="h-5 w-5 text-muted" />
  }
}

export const FileList: React.FC<FileListProps> = ({ files, uploadedFilesFromDB, onRemoveFile }) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  if (files.length === 0) return null

  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">{t.uploadedFiles}</h2>
          <Badge variant="info">{files.length} {t.files}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="space-y-3">
          {files.map(file => {
            const enrichmentStatus = uploadedFilesFromDB.find(
              f => f.id === file.uniqueId
            )?.enrichment_status

            return (
              <div
                key={file.uniqueId || file.name}
                className="flex items-center gap-4 rounded-lg border border-border bg-elevated p-4"
              >
                {getStatusIcon(file.status)}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{file.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {formatFileSize(file.size)}
                    {file.rows && ` • ${file.rows.toLocaleString()} ${t.rows}`}
                    {file.columns && ` • ${file.columns} ${t.columns}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      file.status === 'success'
                        ? 'success'
                        : file.status === 'error'
                          ? 'error'
                          : 'default'
                    }
                  >
                    {file.status}
                  </Badge>
                  {enrichmentStatus === 'completed' && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {t.enriched}
                    </Badge>
                  )}
                  {enrichmentStatus === 'pending' && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3 animate-pulse" />
                      {t.enriching}
                    </Badge>
                  )}
                  {enrichmentStatus === 'failed' && (
                    <Badge variant="error" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {t.failed}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => onRemoveFile(file.uniqueId || file.name)}
                  className="rounded-lg p-2 transition-colors hover:bg-card"
                >
                  <X className="h-4 w-4 text-muted hover:text-text" />
                </button>
              </div>
            )
          })}
        </div>
      </Card.Body>
    </Card>
  )
}
