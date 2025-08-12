import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Home from './components/pages/Home/Home.jsx'
import Shop from './components/pages/Shop/Shop.jsx'
import AddBook from './components/pages/Add-book/AddBook.jsx'
import BookContaxt from './Contaxt/BookContaxt.jsx'
import EditBook from './components/pages/editBook/EditBook.jsx'
import Details from './components/pages/Product/Details.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home/>
            }, {
                path: '/shop',
                element: <Shop/>
            }, {
                path: '/add-book',
                element: <AddBook/>
            }, {
                path: '/edit/:id',
                element: <EditBook/>
            }, {
                path: '/details/:id',
                element: <Details/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <BookContaxt>
        <RouterProvider router={router}></RouterProvider>
    </BookContaxt>
</StrictMode>,)
