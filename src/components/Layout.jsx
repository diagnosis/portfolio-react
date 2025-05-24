import { Header } from '../Header';
import Footer from '../Footer';
import { BottomNav } from './BottomNav';

export function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
        </>
    );
}