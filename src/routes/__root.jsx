import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { useSwipeable } from 'react-swipeable';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { Spinner } from '../components/Spinner';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();
    const routes = ['/', '/about', '/skills', '/projects', '/study-projects', '/contact'];
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        const handleRouteChange = () => {
            setIsLoading(router.state.status === 'pending');
        };

        const unsubscribe = router.subscribe('onStateChange', handleRouteChange);
        return () => unsubscribe();
    }, [router]);

    const { swipeOffset, handlers } = useSwipeNavigation(router, routes, screenWidth);
    const swipeableConfig = {
        ...handlers,
        preventScrollOnSwipe: false,
        trackMouse: false,
        trackTouch: true,
        delta: 10,
        swipeDuration: 500,
        preventDefaultTouchmoveEvent: false,
    };

    return (
        <Layout>
            <AnimatePresence>
                {isLoading && <Spinner />}
            </AnimatePresence>
            <div {...useSwipeable(swipeableConfig)} className="screen overflow-x-hidden">
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
        </Layout>
    );
}