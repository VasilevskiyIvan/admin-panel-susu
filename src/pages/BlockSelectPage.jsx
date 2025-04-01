import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import MenuSection from '../components/MenuSection'
import './BlockSelectPage.css'

const BlockSelectPage = () => {
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('/api/blocks')
        if (!response.ok) throw new Error('Ошибка загрузки')
        const data = await response.json()
        setBlocks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlocks()
  }, [])

  if (isLoading) return <div className="loading">Загрузка блоков...</div>
  if (error) return <div className="error">Ошибка: {error}</div>

  return (
    <div className="page">
      <MenuSection />
      <div className="block-select-page">
        <Header title="Выберите блок для редактирования" />
        <div className="container">
          <div className="blocks-grid">
            {blocks.map(block => (
              <div key={block.id} className="block-card">
                <h3>{block.languages.ru.title || 'Без названия'}</h3>
                <div className="block-actions">
                  <Link to={`/blocks/edit/${block.id}`} className="edit-button">
                    Редактировать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSelectPage;