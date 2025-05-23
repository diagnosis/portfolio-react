import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '../Header.jsx';
import Footer from "../Footer.jsx";
import { BottomNav } from '../components/BottomNav.jsx';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
      <>
            <Header />

                <Outlet />
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
            {/*<TanStackRouterDevtools />*/}
</>
    );
}