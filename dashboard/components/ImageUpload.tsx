import Spinner from '@/assets/Spinner'
import { uploadImage } from '@/utilities/actions'
import { cn } from '@/utilities/helpers'
import Image from 'next/image'
import { ChangeEvent, DragEvent, ReactElement, useRef, useState } from 'react'
import { toast } from 'sonner'
import Button from './Button'

type Props = {
  label: string
  filename: string
  folder: string
  previewUrl: string | null
  onUpload: (imageUrl: string) => Promise<void> | void
}
export default function ImageUpload(props: Props): ReactElement {
  const { label, filename, folder, previewUrl, onUpload } = props

  const [overDrop, setOverDrop] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileSelect = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<void> => {
    setLoading(true)

    const { data: path, error } = await uploadImage({ file, filename, folder })
    if (!path || error) {
      toast.error(error || 'Error uploading image')
      setLoading(false)
      return
    }

    // Build the full storage URL and pass it to the callback
    // (for updating database with the image URL where required)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH
    if (!supabaseUrl || !supabaseStorage) throw Error('Env vars are not set')
    await onUpload(`${supabaseUrl}${supabaseStorage}${path}`)

    setLoading(false)
  }

  const handleFileEvent = (files: FileList | null): void => {
    if (!files) {
      toast.error('No files selected')
      return
    }
    if (files.length > 1) {
      toast.error('Too many files selected')
      return
    }
    if (!files[0].type.startsWith('image/')) {
      toast.error('You must select an image file')
      return
    }
    uploadFile(files[0])
  }

  const handleFileDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setOverDrop(false)
    handleFileEvent(event.dataTransfer.files)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleFileEvent(event.target.files)
  }

  const handleFileSelect = (): void => {
    fileSelect.current?.click()
  }

  return (
    <label>
      <div className="mb-1 text-sm font-medium">{label}</div>
      <div className="flex gap-x-2">
        {previewUrl && (
          <div className="relative min-h-32 min-w-32 rounded-lg">
            <Image
              src={previewUrl}
              alt="Profile image preview"
              fill
              className="object-cover object-top"
            />
          </div>
        )}
        <div
          className={cn(
            'relative flex min-h-32 items-center gap-x-2 rounded-lg border-2 border-dashed p-6 duration-200',
            overDrop ? 'border-highlight bg-lightest' : 'border-medium',
          )}
          onDrop={handleFileDrop}
          onDragOver={(event): void => {
            event.preventDefault()
            setOverDrop(true)
          }}
          onDragExit={(): void => setOverDrop(false)}
          onDragEnd={(): void => setOverDrop(false)}
        >
          <Spinner
            className={cn(
              'absolute top-0 right-0 bottom-0 left-0 m-auto fill-dark opacity-0',
              loading && 'opacity-100',
            )}
          />
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-2',
              loading && 'opacity-0',
            )}
          >
            <Button
              className="min-h-7 text-sm text-dark"
              soft
              onClick={handleFileSelect}
              disabled={loading}
            >
              {previewUrl ? 'Upload new image' : 'Upload image'}
            </Button>
            <span>or drag file here</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        ref={fileSelect}
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  )
}
