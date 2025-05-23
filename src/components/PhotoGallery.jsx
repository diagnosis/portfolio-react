import { useState } from 'react';
import { Modal } from '../Modal';

const photos = [
    {
        id: 1,
        url: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
        title: "Mountain Lake",
    },
    {
        id: 2,
        url: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
        title: "Forest Path",
    },
    {
        id: 3,
        url: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg",
        title: "Sunset Beach",
    },
    {
        id: 4,
        url: "https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg",
        title: "Mountain Peak",
    }
];

export function PhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {photos.map((photo) => (
                    <div 
                        key={photo.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <img 
                            src={photo.url} 
                            alt={photo.title}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
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
                            alt={selectedPhoto.title}
                            className="w-full rounded-lg"
                        />
                        <p className="text-white text-center mt-4">{selectedPhoto.title}</p>
                    </div>
                </Modal>
            )}
        </>
    );
}