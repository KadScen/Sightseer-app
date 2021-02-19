import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class Gallery extends React.Component {

  onSlideChange(e) {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  }

  onSlideChanged(e) {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  }

  render() {
    const responsive = {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1024: {
        items: 3
      }
    };

    return (
      <AliceCarousel
        duration={400}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        playButtonEnabled={true}
        responsive={responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlayActionDisabled={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      >
        <div className="yours-custom-class"><img src="https://www.vancouvertrails.com/images/hikes/quarry-rock.jpg" /></div>
        <div className="yours-custom-class"><img src="https://www.vancouvertrails.com/images/photos/quarry-rock-1.jpg" /></div>
        <div className="yours-custom-class"><img src="https://www.vancouvertrails.com/images/photos/quarry-rock-2.jpg" /></div>
        <div className="yours-custom-class"><img src="https://www.vancouvertrails.com/images/photos/quarry-rock-3.jpg" /></div>
        <div className="yours-custom-class"><img src="https://www.vancouvertrails.com/images/photos/quarry-rock-4.jpg" /></div>
      </AliceCarousel>
    );
  }
}

export default Gallery;