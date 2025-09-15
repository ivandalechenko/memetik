// pathStore.js
import { makeAutoObservable } from "mobx";

class PathStore {
    path = JSON.stringify(this.parsePath(window.location.pathname));

    constructor() {
        makeAutoObservable(this);
    }

    updatePath() {
        this.path = JSON.stringify(this.parsePath(window.location.pathname));
    }

    parsePath(pathname) {
        const parsedPath = pathname.split("/").filter(Boolean);
        return parsedPath// ['путь','подпуть']
    }

    getPath() {
        try {
            return JSON.parse(this.path)
        } catch (error) {
            return ['']
        }
    }

    setPath(newPath, replace = false) {
        if (Array.isArray(newPath)) {
            newPath = "/" + newPath.join("/");
        }

        if (replace) {
            window.history.replaceState({}, "", newPath);
        } else {
            window.history.pushState({}, "", newPath);
        }

        this.path = JSON.stringify(this.parsePath(newPath));
    }
}

const pathStore = new PathStore();
export default pathStore;
