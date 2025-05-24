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
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);

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

    const updateSwipeOffset = useCallback(
        throttle((offset) => setSwipeOffset(offset), 16),
        []
    );

    const handlers = useSwipeable({
        onTouchStartOrOnMouseDown: ({ event }) => {
            const touch = event.touches?.[0];
            if (touch) {
                setTouchStartX(touch.clientX);
                setTouchStartY(touch.clientY);
                setIsVerticalScroll(false);
            }
        },
        onSwiping: (e) => {
            if (isVerticalScroll) return;
            
            const maxOffset = screenWidth * 0.3;
            const cappedOffset = Math.max(-maxOffset, Math.min(maxOffset, e.deltaX));
            updateSwipeOffset(cappedOffset);
        },
        onSwipedLeft: (e) => {
            if (isVerticalScroll || Math.abs(e.deltaX) < 50) return;

            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex < routes.length - 1) {
                router.navigate({ to: routes[currentIndex + 1] });
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            if (isVerticalScroll || Math.abs(e.deltaX) < 50) return;

            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex > 0) {
                router.navigate({ to: routes[currentIndex - 1] });
            }
            setSwipeOffset(0);
        },
        onTouchEndOrOnMouseUp: () => {
            setSwipeOffset(0);
            setIsVerticalScroll(false);
            setTouchStartX(null);
            setTouchStartY(null);
        },
        preventScrollOnSwipe: false,
        trackMouse: false,
        trackTouch: true,
        delta: 10,
        swipeDuration: 500,
        preventDefaultTouchmoveEvent: false,
    });

    useEffect(() => {
        const handleTouchMove = (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - touchStartX);
            const deltaY = Math.abs(touch.clientY - touchStartY);
            
            // If vertical movement is 1.2x greater than horizontal, treat as vertical scroll
            if (deltaY > deltaX * 1.2) {
                setIsVerticalScroll(true);
            }
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        return () => document.removeEventListener('touchmove', handleTouchMove);
    }, [touchStartX, touchStartY]);

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
                        transition: swipeOffset ? 'none' : 'transform 0.3s ease-out',
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