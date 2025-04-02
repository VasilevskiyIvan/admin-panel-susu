import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Indicators from '../components/Indicators'
import Language from '../components/Language'
import Photos from '../components/Photos'
import Videos from '../components/Videos'
import OtherFiles from '../components/OtherFiles'
import MenuSection from '../components/MenuSection'
import './AddBlockPage.css'

const AddBlockPage = () => {
    const navigate = useNavigate()
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

    const getIndicatorStatus = (lang) => {
        const { title, content } = languages[lang]
        if (!title && !content) return 'danger'
        if (title && content) return 'success'
        return 'warning'
    }

    const handleLanguageChange = (lang, field, value) => {
        setLanguages(prev => ({
            ...prev,
            [lang]: { ...prev[lang], [field]: value }
        }))
    }

    const handleAddMedia = (type, files) => {
        if (type === 'image') setPhotos(prev => [...prev, ...files])
        if (type === 'video') setVideos(prev => [...prev, ...files])
        if (type === 'other') setOtherFiles(prev => [...prev, ...files])
    }

    const handleDeleteMedia = (type, index) => {
        if (type === 'image') {
            setPhotos(prev => prev.filter((_, i) => i !== index))
            setCurrentPhotoIndex(0)
        }
        if (type === 'video') {
            setVideos(prev => prev.filter((_, i) => i !== index))
            setCurrentVideoIndex(0)
        }
        if (type === 'other') {
            setOtherFiles(prev => prev.filter((_, i) => i !== index))
        }
    }

    const handleSaveBlock = async () => {
        try {
            const blockResponse = await fetch('/api/blocks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ languages })
            })
            
            if (!blockResponse.ok) throw new Error('Ошибка создания блока')
            const { id: blockId } = await blockResponse.json()

            const uploadMedia = async (type, files) => {
                if (files.length === 0) return
                const formData = new FormData()
                files.forEach(f => formData.append(type, f.file))
                await fetch(`/api/blocks/${blockId}/${type}`, {
                    method: 'POST',
                    body: formData
                })
            }

            await Promise.all([
                uploadMedia('photos', photos),
                uploadMedia('videos', videos),
                uploadMedia('files', otherFiles)
            ])

            navigate('/blocks')
        } catch (error) {
            console.error('Ошибка сохранения:', error)
            alert('Ошибка сохранения блока: ' + error.message)
        }
    }


    return (
        <div className="page">
            <MenuSection />
            <div className="add-block-page">
                <Header title="Добавить новый блок" />

                <div className="container">
                    <Indicators languages={['ru', 'en', 'zh', 'ar']} getStatus={getIndicatorStatus} />
                    <Language
                        selectedLanguage={selectedLanguage}
                        onSelect={setSelectedLanguage}
                        languages={languages}
                        onChange={handleLanguageChange}
                    />
                    <Photos
                        files={photos}
                        currentIndex={currentPhotoIndex}
                        onAdd={handleAddMedia}
                        onDelete={handleDeleteMedia}
                        onChangeIndex={setCurrentPhotoIndex}
                    />
                    <Videos
                        files={videos}
                        currentIndex={currentVideoIndex}
                        onAdd={handleAddMedia}
                        onDelete={handleDeleteMedia}
                        onChangeIndex={setCurrentVideoIndex}
                    />
                    <OtherFiles
                        files={otherFiles}
                        onAdd={handleAddMedia}
                        onDelete={handleDeleteMedia}
                    />

                    <button className="save-button" onClick={handleSaveBlock}>Сохранить блок</button>
                </div>
            </div>
        </div>
    )
}
export default AddBlockPage
