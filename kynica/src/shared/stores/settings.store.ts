import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export class SettingsUser {
  rootStore: RootStore;
  theme: string = localStorage.getItem("app_theme") || "dark";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.applyTheme(this.theme);
    this.rootStore = rootStore;

    reaction(
      () => this.theme,
      (newTheme) => {
        localStorage.setItem("app_theme", newTheme);
        this.applyTheme(newTheme);
      },
    );
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
  }

  applyTheme(theme: string) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }
}
