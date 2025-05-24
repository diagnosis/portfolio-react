import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from '../Footer.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

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
        }, 16, { leading: true, trailing: true }),
        []
    );

    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            if (isVerticalScroll) return;
            const swipeThreshold = screenWidth * 0.35;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentPath = router.state.location.pathname;
                const currentIndex = routes.indexOf(currentPath);
                console.log('Swiped Left:', { currentPath, currentIndex, deltaX: e.deltaX }); // Debug
                if (currentIndex === -1) {
                    console.warn('Unknown route:', currentPath);
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
            const swipeThreshold = screenWidth * 0.35;
            if (Math.abs(e.deltaX) > swipeThreshold) {
                const currentPath = router.state.location.pathname;
                const currentIndex = routes.indexOf(currentPath);
                console.log('Swiped Right:', { currentPath, currentIndex, deltaX: e.deltaX }); // Debug
                if (currentIndex === -1) {
                    console.warn('Unknown route:', currentPath);
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
            const cappedOffset = Math.max(-screenWidth * 0.4, Math.min(screenWidth * 0.4, e.deltaX));
            updateSwipeOffset(cappedOffset);
        },
        onSwipeEnd: () => {
            console.log('Swipe Ended:', { swipeOffset, isVerticalScroll }); // Debug
            setSwipeOffset(0);
            setIsVerticalScroll(false);
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
                    if (deltaY > deltaX * 1.5) {
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
        delta: 20,
        preventDefaultTouchmoveEvent: false,
    });

    // Reset swipeOffset on route change
    useEffect(() => {
        setSwipeOffset(0);
        setIsVerticalScroll(false);
        console.log('Route Changed:', router.state.location.pathname); // Debug
    }, [router.state.location.pathname]);

    return (
        <>
            <Header />
            <div {...handlers} className="min-h-screen overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={router.state.location.pathname}
                        initial={{ x: swipeOffset > 0 ? screenWidth : -screenWidth, opacity: 0.5 }}
                        animate={{ x: swipeOffset, opacity: 1 }}
                        exit={{ x: swipeOffset > 0 ? -screenWidth : screenWidth, opacity: 0.5 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            willChange: 'transform, opacity',
                            position: 'absolute',
                            width: '100%',
                            minHeight: '100vh',
                            touchAction: 'auto',
                        }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
        </>
    );
}