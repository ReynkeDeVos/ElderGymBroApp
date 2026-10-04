import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// react-slick is CommonJS; Vite 8 hands us module.exports
const Slider = SlickSlider.default ?? SlickSlider;

// One centred slide with its neighbours peeking in; extra props go to react-slick.
// Use beforeChange to react to slide changes: react-slick drops afterChange when it re-renders mid-animation.
const Carousel = ({ children, ...props }) => (
  <Slider dots infinite={false} speed={500} centerMode centerPadding="20%" arrows={false} focusOnSelect {...props}>
    {children}
  </Slider>
);

export default Carousel;
