import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect } from 'react';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();
    const routes = ['/', '/about', '/skills', '/projects', '/study-projects', '/contact'];
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            const swipeThreshold = screenWidth * 0.3; // 30% of screen width
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex < routes.length - 1) {
                    router.navigate({ to: routes[currentIndex + 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            const swipeThreshold = screenWidth * 0.3; // 30% of screen width
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex > 0) {
                    router.navigate({ to: routes[currentIndex - 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwiping: (e) => {
            setSwipeOffset(e.deltaX);
        },
        onSwipeEnd: () => {
            setSwipeOffset(0);
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
        trackTouch: true
    });

    return (
        <>
            <Header />
            <div 
                {...handlers} 
                className="min-h-screen transition-transform duration-200"
                style={{ 
                    transform: `translateX(${swipeOffset}px)`,
                }}
            >
                <Outlet />
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
        </>
    );
}