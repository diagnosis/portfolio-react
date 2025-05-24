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

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({
            ...prev,
            [id]: true
        }));
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {photos.map((photo) => (
                    <div 
                        key={photo.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg bg-black/30"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className={`aspect-w-16 aspect-h-9 ${!loadedImages[photo.id] ? 'animate-pulse bg-gray-700' : ''}`}>
                            <img 
                                src={photo.url} 
                                alt={photo.alt}
                                className={`w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                                    loadedImages[photo.id] ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={() => handleImageLoad(photo.id)}
                            />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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