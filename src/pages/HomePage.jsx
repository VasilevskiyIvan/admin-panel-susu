import { Link } from 'react-router-dom'
import Hierarchy from '../components/Hierarchy/index'
import MenuSection from '../components/MenuSection'
import Header from '../components/Header'
import './HomePage.css'

const HomePage = () => {

  const hierarchyData = [
    { parent_id: null, children_id: 1, children_title: "Главный корень" },
    { parent_id: 1, children_id: 2, children_title: "Технологии будущего" },
    { parent_id: 1, children_id: 3, children_title: "Научные открытия" },
    { parent_id: 2, children_id: 4, children_title: "ИИ и Машинное обучение" },
    { parent_id: 2, children_id: 5, children_title: "Квантовые вычисления" },
    { parent_id: 3, children_id: 6, children_title: "Новая физика" },
    { parent_id: 3, children_id: 7, children_title: "Биоинженерия" },
    { parent_id: 4, children_id: 8, children_title: "Нейросети" },
    { parent_id: 4, children_id: 9, children_title: "Компьютерное зрение" },
    { parent_id: 5, children_id: 10, children_title: "Квантовая связь" },
    { parent_id: 5, children_id: 11, children_title: "Криптография" },
    { parent_id: 6, children_id: 12, children_title: "Темная материя" },
    { parent_id: 6, children_id: 13, children_title: "Космология" },
    { parent_id: 7, children_id: 14, children_title: "Генная инженерия" },
    { parent_id: 7, children_id: 15, children_title: "Бионические органы" },
    { parent_id: 8, children_id: 16, children_title: "Глубокое обучение" },
    { parent_id: 8, children_id: 17, children_title: "Трансформеры" },
    { parent_id: 9, children_id: 18, children_title: "Распознавание образов" },
    { parent_id: 10, children_id: 19, children_title: "Квантовая телепортация" },
    { parent_id: 11, children_id: 20, children_title: "Постквантовая криптография" },
    { parent_id: null, children_id: 21, children_title: "Главный корень" },
    { parent_id: 21, children_id: 26, children_title: "Технологии будущего" },
    { parent_id: 21, children_id: 23, children_title: "Научные открытия" },
    { parent_id: 22, children_id: 24, children_title: "ИИ и Машинное обучение" },
    { parent_id: 22, children_id: 25, children_title: "Квантовые вычисления" },
    { parent_id: 23, children_id: 26, children_title: "Новая физика" },
    { parent_id: 23, children_id: 27, children_title: "Биоинженерия" },
    { parent_id: 24, children_id: 28, children_title: "Нейросети" },
    { parent_id: 24, children_id: 29, children_title: "Компьютерное зрение" },
    { parent_id: 25, children_id: 210, children_title: "Квантовая связь" },
    { parent_id: 25, children_id: 211, children_title: "Криптография" },
    { parent_id: 26, children_id: 212, children_title: "Темная материя" },
    { parent_id: 26, children_id: 213, children_title: "Космология" },
    { parent_id: 27, children_id: 214, children_title: "Генная инженерия" },
    { parent_id: 27, children_id: 215, children_title: "Бионические органы" },
    { parent_id: 28, children_id: 216, children_title: "Глубокое обучение" },
    { parent_id: 28, children_id: 217, children_title: "Трансформеры" },
    { parent_id: 29, children_id: 218, children_title: "Распознавание образов" },
    { parent_id: 210, children_id: 219, children_title: "Квантовая телепортация" },
    { parent_id: 211, children_id: 220, children_title: "Постквантовая криптография" },
    { parent_id: 214, children_id: 240, children_title: "Генная инженерия" },
    { parent_id: 240, children_id: 241, children_title: "Генная инженерия" },
    { parent_id: 241, children_id: 242, children_title: "Генная инженерия" },
    { parent_id: 242, children_id: 243, children_title: "Генная инженерия" },
    { parent_id: 243, children_id: 244, children_title: "Генная инженерия" },
    { parent_id: 244, children_id: 245, children_title: "Генная инженерия" },
  ]

  return (
    <div className="page">
      <MenuSection />

      <div className="hierarchy">
        <Header title="Иерархия блоков" />
        <Hierarchy data={hierarchyData} />
      </div>
    </div>
  )
}

export default HomePage