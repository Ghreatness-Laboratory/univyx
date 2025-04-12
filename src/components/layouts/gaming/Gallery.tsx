import { useEffect, useState } from "react";
import Gallery1 from "../../../assets/images/gaming/gallery-1.jpg";
import Gallery2 from "../../../assets/images/gaming/gallery-2.jpg";
import Gallery3 from "../../../assets/images/gaming/gallery-3.jpg";
import Gallery4 from "../../../assets/images/gaming/gallery-4.jpg";
import Gallery5 from "../../../assets/images/gaming/gallery-5.jpg";
import Gallery6 from "../../../assets/images/gaming/gallery-6.jpg";

const galleryImages = [
  { id: 1, src: Gallery1 },
  { id: 2, src: Gallery2 },
  { id: 3, src: Gallery3 },
  { id: 4, src: Gallery4 },
  { id: 5, src: Gallery5 },
  { id: 6, src: Gallery6 },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold">Gallery of Glory</h2>
        <p className="text-secondary text-lg mt-1">
          Epic moments, legendary plays, and unforgettable battles - witness the
          essence of university esports.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            onClick={() => setSelectedImage(img.src)}
          >
            <img
              src={img.src}
              alt={`Gallery ${img.id}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
              View Moment
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
