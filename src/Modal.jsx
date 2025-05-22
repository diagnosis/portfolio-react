import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement('div');
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-black/80 backdrop-blur-sm border border-teal-500/20 p-6 rounded-lg shadow-xl">
                    {children}
                </div>
            </div>
        </div>,
        elRef.current
    );
};