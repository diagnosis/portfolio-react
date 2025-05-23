import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen max-w-full flex flex-col">
            <Header />
            <main className="flex-1 pt-16 pb-16 md:pb-32">
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