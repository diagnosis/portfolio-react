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
        <div className="flex flex-col min-h-screen fixed inset-0">
            <Header />
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
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