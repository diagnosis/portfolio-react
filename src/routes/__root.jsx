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
            <main className="pt-16 pb-16 md:pb-32 h-[calc(100vh-64px)] overflow-y-auto">
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