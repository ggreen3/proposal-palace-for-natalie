const photos = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80",
];

export const PhotoGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {photos.map((photo, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={photo}
            alt={`Memory ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
};