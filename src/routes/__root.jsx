import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from '../Footer.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

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
        throttle((offset) => setSwipeOffset(offset), 16, { leading: true, trailing: true }),
        []
    );

    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            if (isVerticalScroll) return;
            const swipeThreshold = screenWidth * 0.3; // Reduced for responsiveness
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentPath = router.state.location.pathname;
                const currentIndex = routes.indexOf(currentPath);
                if (currentIndex === -1) {
                    console.warn('Unknown route, resetting to /:', currentPath);
                    router.navigate({ to: '/' });
                    return;
                }
                if (currentIndex < routes.length - 1) {
                    router.navigate({ to: routes[currentIndex + 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            if (isVerticalScroll) return;
            const swipeThreshold = screenWidth * 0.3;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentPath = router.state.location.pathname;
                const currentIndex = routes.indexOf(currentPath);
                if (currentIndex === -1) {
                    console.warn('Unknown route, resetting to /:', currentPath);
                    router.navigate({ to: '/' });
                    return;
                }
                if (currentIndex > 0) {
                    router.navigate({ to: routes[currentIndex - 1] });
                }
            }
            setSwipeOffset(0);
        },
        onSwiping: (e) => {
            if (isVerticalScroll) return;
            const cappedOffset = Math.max(-screenWidth * 0.35, Math.min(screenWidth * 0.35, e.deltaX));
            updateSwipeOffset(cappedOffset);
            // Disable child touch handlers during swipe
            document.querySelectorAll('.interactive').forEach(el => {
                el.style.pointerEvents = 'none';
            });
        },
        onSwipeEnd: () => {
            setSwipeOffset(0);
            setIsVerticalScroll(false);
            // Re-enable child touch handlers
            document.querySelectorAll('.interactive').forEach(el => {
                el.style.pointerEvents = 'auto';
            });
        },
        onTouchStartOrOnMouseDown: (e) => {
            const touch = e.event.touches?.[0];
            if (touch) {
                const startX = touch.clientX;
                const startY = touch.clientY;
                const onMove = (moveEvent) => {
                    const moveTouch = moveEvent.touches[0];
                    const deltaX = Math.abs(moveTouch.clientX - startX);
                    const deltaY = Math.abs(moveTouch.clientY - startY);
                    if (deltaY > deltaX * 1.2) {
                        setIsVerticalScroll(true);
                    }
                    document.removeEventListener('touchmove', onMove);
                };
                document.addEventListener('touchmove', onMove, { once: true });
            }
        },
        preventScrollOnSwipe: false,
        trackMouse: false,
        trackTouch: true,
        delta: 30, // Increased for deliberate swipes
        preventDefaultTouchmoveEvent: false,
    });

    // Reset state on route change
    useEffect(() => {
        setSwipeOffset(0);
        setIsVerticalScroll(false);
    }, [router.state.location.pathname]);

    return (
        <>
            <Header />
            <div {...handlers} className="min-h-screen overflow-x-hidden">
                <div
                    style={{
                        transform: `translateX(${swipeOffset}px)`,
                        transition: swipeOffset ? 'none' : 'transform 0.2s ease-out',
                        willChange: 'transform',
                        width: '100%',
                        minHeight: '100vh',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <Outlet />
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
        </>
    );
}