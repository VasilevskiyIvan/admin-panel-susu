import './Language.css'

const Language = ({ selectedLanguage, onSelect, languages, onChange }) => {
  const handleChange = (lang, field) => (e) => {
    onChange(lang, field, e.target.value)
  }

  return (
    <div className="language-section">
      <div className="language-selector">
        <select 
          value={selectedLanguage} 
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <div className="language-inputs">
        <input
          type="text"
          placeholder="Заголовок"
          value={languages[selectedLanguage].title}
          onChange={handleChange(selectedLanguage, 'title')}
        />
        <textarea
          placeholder="Описание"
          value={languages[selectedLanguage].content}
          onChange={handleChange(selectedLanguage, 'content')}
        />
      </div>
    </div>
  )
}

export default Language