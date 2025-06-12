import { useState } from 'react'
import type { Profile } from '@/utils/supa-types'
import { useEditProfile } from './useEditProfile'

export function useProfileAvatar(profile: Profile) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { uploadAvatar } = useEditProfile(profile)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Cleanup preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handleAvatarUpload = async () => {
    if (!selectedFile) return

    try {
      setIsUploading(true)
      await uploadAvatar(selectedFile)
      setSelectedFile(null)
      setPreviewUrl(null)
    } catch (error) {
      console.error('Failed to upload avatar:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return {
    selectedFile,
    previewUrl,
    isUploading,
    handleFileChange,
    handleAvatarUpload
  }
} 