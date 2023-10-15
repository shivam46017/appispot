import * as React from 'react';
import { useState, useEffect } from 'react';
import './imageViewer.css';




const ExpandingCards = (props) => {
  const [activeId, setActiveId] = useState(1)
  const data = props.data
  const images = []
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const value = obj["url"]; // Extract the value of the specified attribute
    images.push(value); // Add the value to the extractedValues array
  }

  //console.log(images)
  //console.log(data.length)
  // let i = 1;
  // const showImage = (id) => {
  //   document.getElementById(id).style.display = ''
  // }
  // const hideImage = (id) => {
  //   document.getElementById(id).style.display = 'none'
  // }
  // const onClick = id => {
  //   i=id
  //   if (id == 1) {
  //     showImage(1)
  //     setActiveId(1)
  //     showImage(2)
  //     hideImage(length)
  //   }
  //   else if (id != length) {
  //     setActiveId(id);
  //     showImage(id)
  //     hideImage(id - 1)
  //     showImage(id+1)
  //   }
  //   else if (id==length) {
  //     showImage(id)
  //     setActiveId(id);
  //     hideImage(id-1)
  //     showImage(1)
  //     return
  //   }
  // }
  // useEffect(() => {
  //   setActiveId(1)
  //   for (let index = 3; index <= data.length; index++) {
  //     const element = document.getElementById(index);
  //     element.style.display = 'none';
  //   }
  // }, [])

  //SLIDING LOGIC
  // useEffect(() => {
  //   const interval = setInterval(() => {

  //     if (i > data.length) {
  //       i = 1
  //       onClick(i)
  //     } else {
  //       onClick(i)
  //       i++
  //     }
  //   }, 2000);

  //   return () => {
  //     // Clean up the interval on component unmount
  //     clearInterval(interval);
  //   };
  // }, []);
  const [currentIndexOfSmallImageSlider, setcurrentIndexOfSmallImageSlider] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     goToNextSlideOfSmallImageSlider();
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const goToSlide = (index) => {
    setcurrentIndexOfSmallImageSlider(index);
  };
  const goToNextSlideOfSmallImageSlider = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentIndexOfSmallImageSlider === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndexOfSmallImageSlider + 1;
    setcurrentIndexOfSmallImageSlider(index);
  };

  const goToPreviousSlideOfSmallImageSlider = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentIndexOfSmallImageSlider === 0;
    const index = shouldResetIndex ? lastIndex : currentIndexOfSmallImageSlider - 1;
    setcurrentIndexOfSmallImageSlider(index);
  };




  return (
    <>
      {/* SMALL IMAGE SLIDER */}
      {/* <div id='smallImageSlider' className="slider flex sm:hidden relative justify-center items-center mt-[15px] ">
        <img
          className="slider__image relative min-w-[360px] rounded-[25px] "
          src={images[currentIndexOfSmallImageSlider]}
          alt={`Slide ${currentIndexOfSmallImageSlider + 1}`}
        />
        <div className='absolute flex z-20 ' style={{ justifyContent: 'space-between' }}>
          <button className="slider__button " style={{ color: '#aeaeae' }} onClick={goToPreviousSlideOfSmallImageSlider}>
            &#10094;
          </button>
          <button className="slider__button " style={{ color: '#aeaeae', marginLeft: '237px' }} onClick={goToNextSlideOfSmallImageSlider}>
            &#10095;
          </button>
        </div>
        <div className="slider__dots flex z-20">
          {images.map((_, index) => (
            <span
              key={index}
              className={`slider__dot ${index === currentIndexOfSmallImageSlider ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >  </span>
          ))}
        </div>
      </div> */}
      {/* FULL SCREEN IMAGE SLIDER */}
      {/* <div id='fullscreenImageSlider' className='absolute flex justify-center items-center'>

      </div> */}
      {/* IMAGES FOR FULL SCREEN */}
      <div className='mt-8 grid grid-cols-2 relative z-10 mx-auto items-center h-[200px] w-[90vw] m-0 rounded-[25px] p-[10px]' style={{ justifyContent: 'space-between' }}>
        <img className='rounded-l-xl max-h-[200px]' src={images[0]} alt="" />
        <div className="grid grid-cols-2 gap-4 max-h-[200px]">
          <img className='' src={images[3]} alt="" />
          <img className='rounded-tr-xl' src={images[4]} alt="" />
          <img className='' src={images[3]} alt="" />
          <img className='rounded-br-xl' src={images[4]} alt="" />
        </div>
      </div>

    </>
    // <div class="container">
    //   {
    //     props.data.map(card => (
    //       <div
    //         key={card.id}
    //         class={`panel ${card.id} ${activeId === card.id ? 'active' : ''}`}
    //         id={card.id}
    //         style={{ backgroundImage: `url(${card.url})` }}>
    //         <h3>{card.title}</h3>
    //       </div>
    //     ))
    //   }
    // </div>
  )
}

export default ExpandingCards;