import { useState } from 'react'

const useMediaHandler = (initialState = []) => {
  const [files, setFiles] = useState(initialState)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleAdd = (type, newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDelete = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setCurrentIndex(0)
  }

  return {
    files,
    currentIndex,
    setCurrentIndex,
    handleAdd,
    handleDelete
  }
}

export default useMediaHandler