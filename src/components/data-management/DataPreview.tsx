import React from 'react'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Card, Button, Table } from '../ui'
import { UploadedFile, ENRICHED_COLUMNS } from './types'
import clsx from 'clsx'

interface DataPreviewProps {
  files: UploadedFile[]
  uploadedFilesFromDB: Array<{ id: string; enrichment_status?: string }>
  onContinue: () => void
}

export const DataPreview: React.FC<DataPreviewProps> = ({
  files,
  uploadedFilesFromDB,
  onContinue,
}) => {
  const fileWithPreview = files.find(f => f.preview)
  if (!fileWithPreview?.preview?.[0]) return null

  const firstFile = files.find(f => f.uniqueId)
  const enrichmentStatus = uploadedFilesFromDB.find(
    f => f.id === firstFile?.uniqueId
  )?.enrichment_status

  const columns = Object.keys(fileWithPreview.preview[0])

  return (
    <Card variant="default">
      <Card.Header>
        <h2 className="text-xl font-semibold text-text">Data Preview</h2>
        <p className="mt-1 text-sm text-muted">
          First 5 rows
          {enrichmentStatus === 'completed' && (
            <span className="ml-2 text-success">• Enriched columns highlighted in green</span>
          )}
        </p>
      </Card.Header>
      <Card.Body>
        <div className="overflow-x-auto">
          <Table>
            <Table.Header>
              <Table.Row>
                {columns.map(column => {
                  const isEnriched = ENRICHED_COLUMNS.includes(
                    column.toLowerCase().replace(/_/g, '')
                  )

                  return (
                    <Table.HeaderCell
                      key={column}
                      className={clsx(
                        isEnriched && enrichmentStatus === 'completed'
                          ? 'bg-green-900/30 !text-green-400'
                          : ''
                      )}
                    >
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        {column
                          .replace(/_/g, ' ')
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                        {isEnriched && enrichmentStatus === 'completed' && (
                          <Sparkles className="h-3 w-3 text-green-400" />
                        )}
                      </div>
                    </Table.HeaderCell>
                  )
                })}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {fileWithPreview.preview.map((row, index) => (
                <Table.Row key={index}>
                  {Object.entries(row).map(([key, value]) => {
                    let displayValue: string
                    if (value === null || value === undefined) {
                      displayValue = '-'
                    } else if (typeof value === 'object') {
                      displayValue = JSON.stringify(value)
                    } else {
                      // eslint-disable-next-line @typescript-eslint/no-base-to-string
                      displayValue = String(value)
                    }

                    const isEnriched = ENRICHED_COLUMNS.includes(key.toLowerCase().replace(/_/g, ''))

                    return (
                      <Table.Cell
                        key={key}
                        className={clsx(
                          key === 'date' ? 'font-medium' : '',
                          isEnriched && enrichmentStatus === 'completed'
                            ? 'bg-green-900/30 !text-green-400'
                            : ''
                        )}
                      >
                        {displayValue}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-success">
            <CheckCircle2 className="mr-1 inline h-4 w-4" />
            Data looks good!
          </p>
          <Button variant="primary" onClick={onContinue}>
            Continue to Enrichment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}
