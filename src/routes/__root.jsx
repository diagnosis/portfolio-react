import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash'; // Import lodash throttle (or implement your own)

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();
    const routes = ['/', '/about', '/skills', '/projects', '/study-projects', '/contact'];
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Throttled resize handler
    const handleResize = useCallback(
        throttle(() => setScreenWidth(window.innerWidth), 100),
        []
    );

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel(); // Cancel throttle on cleanup
        };
    }, [handleResize]);

    // Throttled swipe offset update
    const updateSwipeOffset = useCallback(
        throttle((offset) => {
            setSwipeOffset(offset);
        }, 16), // ~60fps
        []
    );

    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            const swipeThreshold = screenWidth * 0.4; // Increased to 40% for more deliberate swipes
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex < routes.length - 1) {
                    router.navigate({ to: routes[currentIndex + 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            const swipeThreshold = screenWidth * 0.4;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex > 0) {
                    router.navigate({ to: routes[currentIndex - 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwiping: (e) => {
            // Only update if swipe is within bounds to avoid jitter
            if (Math.abs(e.deltaX) < screenWidth * 0.5) {
                updateSwipeOffset(e.deltaX);
            }
        },
        onSwipeEnd: () => {
            setSwipeOffset(0);
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
        trackTouch: true,
        delta: 10, // Minimum swipe distance to trigger
        preventDefaultTouchmoveEvent: true, // Prevent browser scroll interference
    });

    return (
        <>
            <Header />
            <div
                {...handlers}
                className="min-h-screen transition-transform duration-200 ease-out touch-pan-y"
                style={{
                    transform: `translateX(${swipeOffset}px)`,
                    touchAction: 'pan-y', // Allow vertical scroll, block horizontal
                    willChange: 'transform', // Hint to browser for optimization
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