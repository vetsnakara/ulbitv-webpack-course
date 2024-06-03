import { useState } from "react";
import * as classes from "./App.module.scss";

console.log("classes", classes);

export const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <div>Count: {count}</div>
            <button
                className={classes.button}
                onClick={() => setCount((c) => c + 1)}
            >
                <span>Click</span> here
            </button>
        </div>
    );
};
