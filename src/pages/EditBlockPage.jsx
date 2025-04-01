import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Indicators from '../components/Indicators'
import Language from '../components/Language'
import Photos from '../components/Photos'
import Videos from '../components/Videos'
import OtherFiles from '../components/OtherFiles'
import MenuSection from '../components/MenuSection'

const EditBlockPage = () => {
  const { blockId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  const [selectedLanguage, setSelectedLanguage] = useState('ru')
  const [languages, setLanguages] = useState({
    ru: { title: '', content: '' },
    en: { title: '', content: '' },
    zh: { title: '', content: '' },
    ar: { title: '', content: '' }
  })
  
  const [photos, setPhotos] = useState([])
  const [videos, setVideos] = useState([])
  const [otherFiles, setOtherFiles] = useState([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [blockRes, mediaRes] = await Promise.all([
          fetch(`/api/blocks/${blockId}`),
          fetch(`/api/blocks/${blockId}/media`)
        ])
        
        const blockData = await blockRes.json()
        const mediaData = await mediaRes.json()

        setLanguages(blockData.languages)
        setPhotos(mediaData.photos.map(url => ({ url, isExisting: true })))
        setVideos(mediaData.videos.map(url => ({ url, isExisting: true })))
        setOtherFiles(mediaData.files.map(url => ({
          url,
          name: url.split('/').pop(),
          isExisting: true
        })))

      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [blockId])

  const handleDelete = async () => {
    if (window.confirm('Удалить блок навсегда?')) {
      await fetch(`/api/blocks/${blockId}`, { method: 'DELETE' })
      navigate('/blocks/select')
    }
  }

  const handleSave = async () => {
    try {
      // Сохранение текстовых данных
      await fetch(`/api/blocks/${blockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languages })
      })

      // Сохранение медиа
      const saveMedia = async (type, files) => {
        const formData = new FormData()
        files.filter(f => !f.isExisting).forEach(f => formData.append(type, f.file))
        if(formData.entries().next().done) return
        await fetch(`/api/blocks/${blockId}/${type}`, { method: 'POST', body: formData })
      }

      await Promise.all([
        saveMedia('photos', photos),
        saveMedia('videos', videos),
        saveMedia('files', otherFiles)
      ])

      navigate('/blocks')
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  }

  if (isLoading) return <div className="loading">Загрузка...</div>

  return (
    <div className="page">
      <MenuSection />
      <div className="add-block-page">
        <Header title="Редактирование блока" onDelete={handleDelete} />
        <div className="container">
          <Indicators
            languages={['ru', 'en', 'zh', 'ar']}
            getStatus={lang => {
              const { title, content } = languages[lang] || {};
              if (!title && !content) return 'danger';
              return title && content ? 'success' : 'warning';
            }}
          />
          <Language
            selectedLanguage={selectedLanguage}
            onSelect={setSelectedLanguage}
            languages={languages}
            onChange={(lang, field, value) => setLanguages(prev => ({
              ...prev,
              [lang]: { ...prev[lang], [field]: value }
            }))}
          />
          <Photos
            files={photos}
            currentIndex={currentPhotoIndex}
            onAdd={newFiles => setPhotos(prev => [...prev, ...newFiles])}
            onDelete={index => setPhotos(prev => prev.filter((_, i) => i !== index))}
            onChangeIndex={setCurrentPhotoIndex}
          />
          <Videos
            files={videos}
            currentIndex={currentVideoIndex}
            onAdd={newFiles => setVideos(prev => [...prev, ...newFiles])}
            onDelete={index => setVideos(prev => prev.filter((_, i) => i !== index))}
            onChangeIndex={setCurrentVideoIndex}
          />
          <OtherFiles
            files={otherFiles}
            onAdd={newFiles => setOtherFiles(prev => [...prev, ...newFiles])}
            onDelete={index => setOtherFiles(prev => prev.filter((_, i) => i !== index))}
          />
          <button className="save-button" onClick={handleSave}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlockPage;