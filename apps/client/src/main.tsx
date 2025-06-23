// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/theme.tsx";
import RootLayout from "./layouts/root-layout";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="system">
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<>Pocker room</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </StrictMode>
);
