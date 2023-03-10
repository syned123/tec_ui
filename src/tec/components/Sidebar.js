import userIcon from "./img/user.jpg";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { SlUser } from "react-icons/sl";
import { RiCommunityLine, RiBuildingLine } from "react-icons/ri";
import { BsArchive } from "react-icons/bs";

import { RxFileText } from "react-icons/rx";
import { Box, useTheme } from "@mui/material";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme/theme";
import "react-pro-sidebar/dist/css/styles.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { user } = useAuthStore();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]}`,
          color: "#fff",
          fontFamily: "Inter",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 30px 5px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#FFFFFF !important",
        },
        "& .pro-menu-item.active": {
          color: "#00ff2a !important",

          background:
            "linear-gradient(90deg, rgba(59, 125, 221, 0.1),rgba(59, 125, 221, 0.088) 50%, hsla(0, 0%, 100%, 0))",
        },
      }}
    >
      {user.rol === "Administrador" ? (
        <ProSidebar
          image={image}
          collapsed={collapsed}
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint="md"
        >
          <SidebarHeader>
            <Menu iconShape="circle">
              {collapsed ? (
                <MenuItem
                  icon={<FaAngleDoubleRight />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <div>
                  <div className="sidebar">
                    <div className="title">TECNOGENIA</div>
                    <div>
                      <MenuItem
                        suffix={<FaAngleDoubleLeft />}
                        onClick={handleCollapsedChange}
                      ></MenuItem>
                    </div>
                  </div>
                  <div className="user">
                    <div className="userCont">
                      <div className="imgCont">
                        <img src={userIcon} alt="" className="img" />
                      </div>
                      <div className="ps-2">
                        <div className="namerol">
                          {user.name} {user.lastname}
                        </div>
                        <div>
                          <span className="rols">{user.rol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              <MenuItem
                icon={<CiHome />}
                className={splitLocation[1] === "dashboard" ? "active" : ""}
              >
                Dashboard
                <Link to="dashboard" />
              </MenuItem>
              <MenuItem
                icon={<SlUser />}
                className={splitLocation[1] === "user" ? "active" : ""}
              >
                Usuarios
                <Link to="user" />
              </MenuItem>
              <MenuItem
                icon={<RxFileText />}
                className={splitLocation[1] === "ticket" ? "active" : ""}
              >
                Boletas
                <Link to="ticket" />
              </MenuItem>
              <MenuItem
                icon={<RiBuildingLine />}
                className={splitLocation[1] === "company" ? "active" : ""}
              >
                Entidades Financieras
                <Link to="company" />
              </MenuItem>
              <MenuItem
                icon={<RiCommunityLine />}
                className={splitLocation[1] === "agency" ? "active" : ""}
              >
                Agencias
                <Link to="agency" />
              </MenuItem>
              <MenuItem
                icon={<BsArchive />}
                className={splitLocation[1] === "equipment" ? "active" : ""}
              >
                Equipos
                <Link to="equipment" />
              </MenuItem>
              <MenuItem
                icon={<CiHome />}
                className={splitLocation[1] === "product" ? "active" : ""}
              >
                Productos
                <Link to="product" />
              </MenuItem>
              <MenuItem
                icon={<CiHome />}
                className={splitLocation[1] === "contact" ? "active" : ""}
              >
                Contactos
                <Link to="contact" />
              </MenuItem>
              <SubMenu icon={<CiHome />} title="Reportes">
                <MenuItem> Precios <Link to="report/price" /></MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      ) : (
        <ProSidebar
          image={image}
          collapsed={collapsed}
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint="md"
        >
          <SidebarHeader>
            <Menu iconShape="circle">
              {collapsed ? (
                <MenuItem
                  icon={<FaAngleDoubleRight />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <div>
                  <div className="sidebar">
                    <div className="title">TECNOGENIA</div>
                    <div>
                      <MenuItem
                        suffix={<FaAngleDoubleLeft />}
                        onClick={handleCollapsedChange}
                      ></MenuItem>
                    </div>
                  </div>
                  <div className="user">
                    <div className="userCont">
                      <div className="imgCont">
                        <img src={userIcon} alt="" className="img" />
                      </div>
                      <div className="ps-2">
                        <div className="namerol">
                          {user.name} {user.lastname}
                        </div>
                        <div>
                          <span className="rols">{user.rol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              <MenuItem
                icon={<CiHome />}
                className={splitLocation[1] === "dashboard" ? "active" : ""}
              >
                Dashboard
                <Link to="dashboard" />
              </MenuItem>

              <MenuItem
                icon={<CiHome />}
                className={splitLocation[1] === "ticket" ? "active" : ""}
              >
                Boletas
                <Link to="ticket" />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      )}
    </Box>
  );
};
