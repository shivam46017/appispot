import * as React from 'react';
import { useState } from 'react';
import './imageViewer.css';


const ExpandingCards = (props) => {
  const [activeId, setActiveId] = useState(1)

  console.log(props.data)

  const onClick = id => setActiveId(id);

  return (
    <div class="container">
      {
        props.data.map(card => (
          <div
            key={card.id}
            class={`panel ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})` }}>
            <h3>{card.title}</h3>
          </div>
        ))
      }
    </div>
  )
}

export default ExpandingCards;