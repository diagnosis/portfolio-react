import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="flex flex-col min-h-screen fixed inset-0">
            <Header />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
            <Footer />
            <TanStackRouterDevtools />
        </div>
    );
}