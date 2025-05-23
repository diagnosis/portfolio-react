import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from '../Footer.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash'; // Ensure lodash is installed: npm install lodash

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();
    const routes = ['/', '/about', '/skills', '/projects', '/study-projects', '/contact'];
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isVerticalScroll, setIsVerticalScroll] = useState(false);

    // Throttled resize handler
    const handleResize = useCallback(
        throttle(() => setScreenWidth(window.innerWidth), 100),
        []
    );

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
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
            if (isVerticalScroll) return; // Skip if vertical scrolling
            const swipeThreshold = screenWidth * 0.4;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex === -1) return; // Skip unknown routes
                if (currentIndex < routes.length - 1) {
                    router.navigate({ to: routes[currentIndex + 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            if (isVerticalScroll) return;
            const swipeThreshold = screenWidth * 0.4;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentIndex = routes.indexOf(router.state.location.pathname);
                if (currentIndex === -1) return;
                if (currentIndex > 0) {
                    router.navigate({ to: routes[currentIndex - 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwiping: (e) => {
            if (isVerticalScroll) return;
            // Only update offset if swipe is within bounds
            if (Math.abs(e.deltaX) < screenWidth * 0.5) {
                updateSwipeOffset(e.deltaX);
            }
        },
        onSwipeEnd: () => {
            setSwipeOffset(0);
            setIsVerticalScroll(false);
        },
        onTouchStartOrOnMouseDown: (e) => {
            // Detect if gesture is more vertical than horizontal
            const touch = e.event.touches?.[0];
            if (touch) {
                const startX = touch.clientX;
                const startY = touch.clientY;
                const onMove = (moveEvent) => {
                    const moveTouch = moveEvent.touches[0];
                    const deltaX = Math.abs(moveTouch.clientX - startX);
                    const deltaY = Math.abs(moveTouch.clientY - startY);
                    if (deltaY > deltaX * 1.5) { // Vertical movement dominates
                        setIsVerticalScroll(true);
                    }
                    document.removeEventListener('touchmove', onMove);
                };
                document.addEventListener('touchmove', onMove, { once: true });
            }
        },
        preventScrollOnSwipe: false, // Allow vertical scroll
        trackMouse: false,
        trackTouch: true,
        delta: 15, // Increased for less sensitivity
        preventDefaultTouchmoveEvent: false, // Allow pinch-to-zoom
    });

    return (
        <>
            <Header />
            <div
                {...handlers}
                className="min-h-screen transition-transform duration-200 ease-out"
                style={{
                    transform: `translateX(${swipeOffset}px)`,
                    willChange: 'transform', // GPU acceleration
                    touchAction: 'auto', // Allow pinch-to-zoom and scroll
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