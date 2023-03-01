import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme/theme";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Agency } from "../pages/agency/agency";
import { Company } from "../pages/company/company";
import { Contact } from "../pages/contact/contact";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Equipment } from "../pages/equipmet/equipment";
import { Product } from "../pages/product/product";
import { TemplateFormBoleta } from "../pages/ticket/templateFormBoleta";
import { Ticket } from "../pages/ticket/ticket";
import { User } from "../pages/user/user";

export const TecRoutes = () => {
  const [theme, colorMode] = useMode();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${toggled} ? 'toggled':'' `}>
          <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
          />
          <main className="content">
            <Navbar
              a={collapsed}
              b={toggled}
              c={handleToggleSidebar}
              d={handleCollapsedChange}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
              <Route path="/company" element={<Company />} />
              <Route path="/agency" element={<Agency />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/product" element={<Product />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/create/ticket" element={<TemplateFormBoleta />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
