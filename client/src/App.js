import Home from './Components/Home';
import {
    createBrowserRouter,
    RouterProvider,
    useRouteError,
} from "react-router-dom";
import { useAllDataState } from './Contexts/dataContext';
import Navbar from './Components/Navbar';
import Error from './Components/Error';
import About from './Components/About';
import Page from './Components/Page';
import Actions from './Components/Actions';
import CreatePage from './Components/CreatePage';
import CreateNote from './Components/CreateNote';

function App() {
    const { pages } = useAllDataState();

    const ErrorBoundary = () => {
        let error = useRouteError();
        console.error(error);
        return <div className='flex flex-col w-screen'>
            <Navbar />
            <Error />
        </div>;
    }

    const pageRoutes = pages.map(page => {
        return {
            path: page.path,
            element: <div className='flex flex-col w-screen'>
                <Navbar />
                <Page page={page} />
                <Actions />
            </div>,
            errorElement: <ErrorBoundary />
        }
    })

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div className='flex flex-col w-screen'>
                    <Navbar />
                    <Home />
                    <Actions />
                </div>
            ),
            errorElement: <ErrorBoundary />
        },
        {
            path: "/aboutPage",
            element: (
                <div className='flex flex-col w-screen'>
                    <Navbar />
                    <About />
                </div>
            ),
            errorElement: <ErrorBoundary />
        },
        {
            path: "/createPage",
            element: (
                <div className='flex flex-col w-screen'>
                    <Navbar />
                    <CreatePage />
                </div>
            ),
            errorElement: <ErrorBoundary />
        },
        {
            path: "/createNote",
            element: (
                <div className='flex flex-col w-screen'>
                    <Navbar />
                    <CreateNote />
                </div>
            ),
            errorElement: <ErrorBoundary />
        },
        ...pageRoutes
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
