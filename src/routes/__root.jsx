import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";


export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen">
            <Header />
                <Outlet />
            <Footer></Footer>
            <TanStackRouterDevtools />
        </div>
    );
}