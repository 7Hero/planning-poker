// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/theme.tsx";
import { RootLayout } from "./layouts/root-layout";
import { PokerRoom } from "./pages/poker-room.tsx";
import { ProtectedRoute } from "./pages/protected-route.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="system">
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={<Navigate to={`/room/${crypto.randomUUID()}`} replace />}
            />
            <Route path="/room/:roomId" element={<PokerRoom />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </StrictMode>
);
