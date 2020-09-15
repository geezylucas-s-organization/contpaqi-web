import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import { Home, Documents, CreateDocument } from "../screens";

export const RoutesExact = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: Home,
    icon: HomeIcon,
  },
  {
    path: "/createdocument",
    sidebarName: "Crear documento",
    component: CreateDocument,
    icon: CreateIcon,
  },
  {
    path: "/documents",
    sidebarName: "Listado de facturas",
    component: Documents,
    icon: ListIcon,
  },
  {
    path: "/createproduct",
    sidebarName: "Crear producto",
    component: null,
    icon: CreateIcon,
  },
  {
    path: "/createclient",
    sidebarName: "Crear cliente",
    component: null,
    icon: CreateIcon,
  },
  {
    path: "/templates",
    sidebarName: "Administrar facturas automáticas",
    component: null,
    icon: ListIcon,
  },
];
