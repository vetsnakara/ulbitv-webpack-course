import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import * as classes from "./App.module.scss";

import avatarPng from "@/assets/avatar.png";
import avatarJpg from "@/assets/avatar.jpg";
import AppImage from "@/assets/app-image.svg";

export const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div data-testid="App">
            {__PLATFORM__ === "desktop" && <h1>PLATFORM: 💻</h1>}
            {__PLATFORM__ === "mobile" && <h1>PLATFORM: 📲</h1>}

            {__ENV__ === "development" && <h1>ENV: 🔄</h1>}
            {__ENV__ === "production" && <h1>ENV: ✅</h1>}

            <img width={100} height={100} src={avatarPng} />
            <img width={100} height={100} src={avatarJpg} />

            <div data-testid="Images">
                <AppImage width={100} height={100} fill="green" />
                <AppImage width={100} height={100} color="red" />
                <AppImage width={100} height={100} style={{ color: "blue" }} />
                <AppImage width={100} height={100} className={classes.icon} />
            </div>

            <nav>
                <Link to="/about">About</Link>
                <Link to="/shop">Shop</Link>
            </nav>

            <div>Count: {count}</div>

            <button
                className={classes.button}
                onClick={() => setCount((c) => c + 1)}
            >
                <span>Click</span> here
            </button>

            <Outlet />
        </div>
    );
};
