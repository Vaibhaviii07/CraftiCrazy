import { Parallax } from "react-parallax";

const ParallaxSection = () => {
  return (
    <Parallax
      blur={0}
      bgImage="/background.jpg" 
      bgImageAlt="Indian Handicrafts"
      strength={400} 
    >
      <div className="h-[500px] flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
         Every Gift Tells a Story
        </h1>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
