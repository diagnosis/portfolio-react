import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Header } from '../Header.jsx';
import Footer from '../Footer.jsx';
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { Spinner } from '../components/Spinner';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

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
    const [swipeVelocity, setSwipeVelocity] = useState(0);
    const [lastTouchX, setLastTouchX] = useState(null);
    const [lastTouchTime, setLastTouchTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get current route title
    const getPageTitle = () => {
        const path = router.state.location.pathname;
        const titles = {
            '/': 'Home',
            '/about': 'About Me',
            '/skills': 'Technical Skills',
            '/projects': 'Projects',
            '/study-projects': 'Study Projects',
            '/contact': 'Contact'
        };
        return `${titles[path] || 'Page Not Found'} | Safa Demirkan`;
    };

    // Get current route description
    const getPageDescription = () => {
        const path = router.state.location.pathname;
        const descriptions = {
            '/': 'Senior Software Engineer in Test with expertise in test automation and quality assurance. Explore my portfolio and professional experience.',
            '/about': 'Learn more about my journey as a Software Engineer in Test, my expertise, and my passion for quality assurance.',
            '/skills': 'Discover my technical skills in test automation, programming languages, and development tools.',
            '/projects': 'View my professional projects and contributions in software testing and development.',
            '/study-projects': 'Explore my personal study projects and continuous learning journey.',
            '/contact': 'Get in touch with me for professional opportunities or collaborations.'
        };
        return descriptions[path] || 'Welcome to my portfolio website';
    };

    useEffect(() => {
        const handleRouteChange = () => {
            if (router.state.status === 'pending') {
                setIsLoading(true);
            } else {
                setIsLoading(false);
            }
        };

        const unsubscribe = router.subscribe('onStateChange', handleRouteChange);
        return () => unsubscribe();
    }, [router]);

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
                setLastTouchX(touch.clientX);
                setLastTouchTime(Date.now());
                setIsVerticalScroll(false);
                setSwipeVelocity(0);
            }
        },
        onSwiping: (e) => {
            if (isVerticalScroll) return;
            
            const touch = e.event.touches?.[0];
            if (touch && lastTouchX !== null && lastTouchTime !== null) {
                const deltaX = touch.clientX - lastTouchX;
                const deltaTime = Date.now() - lastTouchTime;
                const velocity = deltaX / deltaTime;
                
                setSwipeVelocity(velocity);
                setLastTouchX(touch.clientX);
                setLastTouchTime(Date.now());
            }
            
            const maxOffset = screenWidth * 0.2;
            const cappedOffset = Math.max(-maxOffset, Math.min(maxOffset, e.deltaX));
            updateSwipeOffset(cappedOffset);
        },
        onSwipedLeft: (e) => {
            if (isVerticalScroll || (Math.abs(e.deltaX) < 50 && Math.abs(swipeVelocity) < 0.5)) return;

            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex < routes.length - 1) {
                router.navigate({ to: routes[currentIndex + 1] });
            }
            setSwipeOffset(0);
        },
        onSwipedRight: (e) => {
            if (isVerticalScroll || (Math.abs(e.deltaX) < 50 && Math.abs(swipeVelocity) < 0.5)) return;

            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex > 0) {
                router.navigate({ to: routes[currentIndex - 1] });
            }
            setSwipeOffset(0);
        },
        onTouchEndOrOnMouseUp: () => {
            const resetState = () => {
                setSwipeOffset(0);
                setIsVerticalScroll(false);
                setTouchStartX(null);
                setTouchStartY(null);
                setLastTouchX(null);
                setLastTouchTime(null);
                setSwipeVelocity(0);
            };
            
            setTimeout(resetState, 50);
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
        setSwipeVelocity(0);
    }, [router.state.location.pathname]);

    return (
        <>
            <Helmet>
                <title>{getPageTitle()}</title>
                <meta name="description" content={getPageDescription()} />
            </Helmet>
            <Header />
            <AnimatePresence>
                {isLoading && <Spinner />}
            </AnimatePresence>
            <div {...handlers} className="screen overflow-x-hidden">
                <div
                    style={{
                        transform: `translateX(${swipeOffset}px)`,
                        transition: swipeOffset ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform',
                        width: '100%',
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