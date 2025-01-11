const photos = [
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80", // Romantic roses
  "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80", // Couple sunset
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", // Heart hands
];

export const PhotoGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 group"
        >
          <img
            src={photo}
            alt={`Memory ${index + 1}`}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};