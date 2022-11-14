import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./Componnents/Home"

class ReactApp extends HTMLElement{
    connectedCallback(){
        let root=createRoot(this)
        root.render(<Home></Home>)
    }
}

customElements.define('react-app',ReactApp);
console.log(Home)