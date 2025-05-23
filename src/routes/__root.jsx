import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="h-[calc(100vh-64px)] md:h-[calc(100vh-128px)]">
                <Outlet />
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
            <TanStackRouterDevtools />
        </div>
    );
}