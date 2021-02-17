import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Home.styles.scss'

const Home = () => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/QyoyQaH.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/roSfyO7.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/BEziuiI.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/fuseshs.png"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/BqApDSt.png"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/0Quvz19.png"
          alt="sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/EsegJ0C.png"
          alt="seventh slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/aDiD4ZI.png"
          alt="eighth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/kpI2JHe.png"
          alt="nineth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/VlLGj8A.png"
          alt="tenth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel">
        <img
          className="pokemon-img"
          src="https://i.imgur.com/jt6QNDa.png"
          alt="eleventh slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Home
