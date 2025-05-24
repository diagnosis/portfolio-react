import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

export function useSwipeNavigation(router, routes, screenWidth) {
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isVerticalScroll, setIsVerticalScroll] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [swipeVelocity, setSwipeVelocity] = useState(0);
    const [lastTouchX, setLastTouchX] = useState(null);
    const [lastTouchTime, setLastTouchTime] = useState(null);

    const updateSwipeOffset = useCallback(
        throttle((offset) => setSwipeOffset(offset), 16),
        []
    );

    const handleSwipeStart = ({ event }) => {
        const touch = event.touches?.[0];
        if (touch) {
            setTouchStartX(touch.clientX);
            setTouchStartY(touch.clientY);
            setLastTouchX(touch.clientX);
            setLastTouchTime(Date.now());
            setIsVerticalScroll(false);
            setSwipeVelocity(0);
        }
    };

    const handleSwiping = (e) => {
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
    };

    const handleSwipeEnd = () => {
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
    };

    const handleSwipeLeft = (e) => {
        if (isVerticalScroll || (Math.abs(e.deltaX) < 50 && Math.abs(swipeVelocity) < 0.5)) return;

        const currentIndex = routes.indexOf(router.state.location.pathname);
        if (currentIndex < routes.length - 1) {
            router.navigate({ to: routes[currentIndex + 1] });
        }
        setSwipeOffset(0);
    };

    const handleSwipeRight = (e) => {
        if (isVerticalScroll || (Math.abs(e.deltaX) < 50 && Math.abs(swipeVelocity) < 0.5)) return;

        const currentIndex = routes.indexOf(router.state.location.pathname);
        if (currentIndex > 0) {
            router.navigate({ to: routes[currentIndex - 1] });
        }
        setSwipeOffset(0);
    };

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

    return {
        swipeOffset,
        handlers: {
            onTouchStartOrOnMouseDown: handleSwipeStart,
            onSwiping: handleSwiping,
            onSwipedLeft: handleSwipeLeft,
            onSwipedRight: handleSwipeRight,
            onTouchEndOrOnMouseUp: handleSwipeEnd,
        }
    };
}