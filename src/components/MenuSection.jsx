import { Link } from 'react-router-dom'
import './MenuSection.css'
import exitIcon from '/exitIcon.svg'
import hierarchyIcon from '/hierarchyIcon.svg'
import addBlockIcon from '/addBlockIcon.svg'
import editBlockIcon from '/editBlockIcon.svg'
import broadcastIcon from '/broadcastIcon.svg'

const MenuSection = () => {
    return (
        <div className="menu-section">
            <header className="menu-header">
                <h1>Васильева В.В.</h1>
            </header>
            <div className="button-container">
                <Link to="/broadcast" className="exit-button">
                    выход
                    <img src={exitIcon} alt="exitIcon"/>
                </Link>
                <p>Меню: </p>
                <Link to="/" className="menu-button">
                    главная
                    <img src={hierarchyIcon} alt="hierarchyIcon"/>
                </Link>
                <Link to="/blocks/new" className="menu-button">
                    добавление блоков
                    <img src={addBlockIcon} alt="addBlockIcon"/>
                </Link>
                <Link to="/blocks/select" className="menu-button">
                    редактирование блоков
                    <img src={editBlockIcon} alt="editBlockIcon"/>
                </Link>
                <Link to="/broadcast" className="menu-button">
                    рассылка
                    <img src={broadcastIcon} alt="broadcastIcon"/>
                </Link>
            </div>
        </div>
    )
}

export default MenuSection