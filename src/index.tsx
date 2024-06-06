import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./components/App";
import { About } from "./pages/about";
import { Shop } from "./pages/shop";
import { Loader } from "./components/Loader";

const root = document.getElementById("root");
const contranier = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: (
                    <Suspense fallback={<Loader />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/shop",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Shop />
                    </Suspense>
                ),
            },
        ],
    },
]);

contranier.render(<RouterProvider router={router} />);
