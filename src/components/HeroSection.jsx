import { useEffect, useState } from "react";
import { ImagesSlider } from "./ImagesSlider"; // Import ImagesSlider component

const HeroSection = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://times-store-production.up.railway.app/api/sliderimages?populate=*");
        const data = await response.json();
        setImagesData(data.Images.map((item)=>item)); // Accessing images from the API response
        setLoading(false); // Set loading to false when images are fetched
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false); // Stop loading even if the fetch fails
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading state
  }

  return (
    <div>
      <ImagesSlider images={imagesData} autoplay={true} />
    </div>
  );
};

export default HeroSection;
