import * as React from 'react';
import { useState, useEffect } from 'react';
import './imageViewer.css';


const ExpandingCards = (props) => {
  const [activeId, setActiveId] = useState(1)
  const data = props.data
  const length = data.length;
  //console.log(data.length)
  let i = 1;
  const showImage = (id) => {
    document.getElementById(id).style.display = ''
  }
  const hideImage = (id) => {
    document.getElementById(id).style.display = 'none'
  }
  const onClick = id => {
    i=id
    if (id == 1) {
      showImage(1)
      setActiveId(1)
      showImage(2)
      hideImage(length)
    }
    else if (id != length) {
      setActiveId(id);
      showImage(id)
      hideImage(id - 1)
      showImage(id+1)
    }
    else if (id==length) {
      showImage(id)
      setActiveId(id);
      hideImage(id-1)
      showImage(1)
      return
    }
  }
  useEffect(() => {
    setActiveId(1)
    for (let index = 3; index <= data.length; index++) {
      const element = document.getElementById(index);
      element.style.display = 'none';
    }
  }, [])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(i)
  //     if (i == 1) {
  //       showImage(i)
  //       setActiveId(i)
  //       showImage(i + 1)
  //       for (let index = i + 2; index < length; index++) {
  //         hideImage(index)
  //       }
  //       i++
  //     }
  //      else if (i === length) {
  //       showImage(i)
  //       setActiveId(i)
  //       showImage(i-1)
  //       for (let index = 1; index < length-2; index++) {
  //         hideImage(index)
  //       }
  //       i++
  //     }
  //     else if (i>1 && i<length) {
  //       for (let index = 1; index < i; index++) {
  //         hideImage(index)
  //       }
  //       showImage(i)
  //       setActiveId(i)
  //       showImage(i + 1)
  //       for (let index = i + 2; index < length; index++) {
  //         hideImage(index)
  //       }
  //       i++
  //     }
  //     else if (i > length) {
  //       i = 1
  //       showImage(i)
  //       showImage(i+1)
  //       setActiveId(i)
  //       for (let index = 3; index <= length; index++) {
  //         hideImage(index)
  //       }
  //     }
  //   }, 5000);

  //   return () => {
  //     // Clean up the interval on component unmount
  //     clearInterval(interval);
  //   };
  // }, []);
  //SLIDING LOGIC
  useEffect(() => {
    const interval = setInterval(() => {

      if (i > data.length) {
        i = 1
        onClick(i)
      } else {
        onClick(i)
        i++
      }
    }, 2000);

    return () => {
      // Clean up the interval on component unmount
      clearInterval(interval);
    };
  }, []);



  return (
    <div class="container">
      {
        props.data.map(card => (
          <div
            key={card.id}
            class={`panel ${card.id} ${activeId === card.id ? 'active' : ''}`}
            id={card.id}
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