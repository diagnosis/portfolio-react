import { useState } from 'react';
import { Modal } from '../Modal';

const photos = [
    {
        id: 1,
        url: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
        title: "Mountain Lake",
        alt: "Scenic view of a mountain lake surrounded by peaks"
    },
    {
        id: 2,
        url: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
        title: "Forest Path",
        alt: "Sunlit path through a dense forest"
    },
    {
        id: 3,
        url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg",
        title: "Sunset Beach",
        alt: "Beautiful sunset over a tropical beach"
    },
    {
        id: 4,
        url: "https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg",
        title: "Mountain Peak",
        alt: "Snow-capped mountain peak against blue sky"
    }
];

export function PhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [errors, setErrors] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({
            ...prev,
            [id]: true
        }));
        setErrors(prev => ({
            ...prev,
            [id]: false
        }));
    };

    const handleImageError = (id) => {
        setErrors(prev => ({
            ...prev,
            [id]: true
        }));
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-6">
                {photos.map((photo) => (
                    <div 
                        key={photo.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/50 to-black/50 border border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => !errors[photo.id] && setSelectedPhoto(photo)}
                    >
                        <div className={`min-h-[200px] ${!loadedImages[photo.id] ? 'animate-pulse' : ''}`}>
                            {errors[photo.id] ? (
                                <div className="flex items-center justify-center h-full min-h-[200px] text-red-400">
                                    Failed to load image
                                </div>
                            ) : (
                                <img 
                                    src={photo.url} 
                                    alt={photo.alt}
                                    className={`w-full h-[200px] object-cover transform group-hover:scale-110 transition-all duration-500 ${
                                        loadedImages[photo.id] ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => handleImageLoad(photo.id)}
                                    onError={() => handleImageError(photo.id)}
                                />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <p className="text-white text-lg font-medium px-4 text-center">
                                {photo.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPhoto && (
                <Modal>
                    <div className="relative">
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-teal-500/20 text-teal-100 hover:bg-teal-500/30 transition-colors duration-200"
                        >
                            ×
                        </button>
                        <img 
                            src={selectedPhoto.url} 
                            alt={selectedPhoto.alt}
                            className="w-full rounded-lg"
                        />
                        <p className="text-white text-center mt-4">{selectedPhoto.title}</p>
                    </div>
                </Modal>
            )}
        </>
    );
}