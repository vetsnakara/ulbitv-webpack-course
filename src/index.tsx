import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "@/app";
import { Loader } from "@/components";
import { About, Shop } from "@/pages";

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
