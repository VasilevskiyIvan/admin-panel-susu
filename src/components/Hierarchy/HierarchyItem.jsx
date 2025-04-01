import { memo, useState } from 'react'
import './Hierarchy.css'

const HierarchyItem = memo(({ item, level = 0, hasSibling = false, expandedNodes, toggleNode }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleClick = () => {
    toggleNode(item.id)
    setIsExpanded(!isExpanded)
  }

  const isNodeExpanded = expandedNodes.has(item.id)

  return (
    <div className="hierarchy-item">
      <div 
        className="item-content" 
        style={{ marginLeft: `${level * 40}px` }}
        onClick={handleClick}
      >
        <div className={`card ${isNodeExpanded ? 'expanded' : ''}`}>
          <h3 className="card-title">{item.title}</h3>
          {item.children?.length > 0 && (
            <span className="toggle-icon">
              {isNodeExpanded ? '▼' : '▶'}
            </span>
          )}
        </div>
      </div>
      
      {isNodeExpanded && item.children?.map((child, index) => (
        <HierarchyItem 
          key={child.id}
          item={child}
          level={level + 1}
          hasSibling={index < item.children.length - 1}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      ))}
    </div>
  )
})
export default HierarchyItem