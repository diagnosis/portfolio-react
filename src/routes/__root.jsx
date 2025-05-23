import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';
import { useSwipeable } from 'react-swipeable';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();
    const routes = ['/', '/about', '/skills', '/projects', '/study-projects', '/contact'];

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex < routes.length - 1) {
                router.navigate({ to: routes[currentIndex + 1] });
            }
        },
        onSwipedRight: () => {
            const currentIndex = routes.indexOf(router.state.location.pathname);
            if (currentIndex > 0) {
                router.navigate({ to: routes[currentIndex - 1] });
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: false
    });

    return (
      <>
            <Header />
            <div {...handlers} className="flex-grow">
                <Outlet />
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
      </>
    );
}