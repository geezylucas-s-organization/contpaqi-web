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
    sidebarName: "Documentos",
    component: Documents,
    icon: ListIcon,
  },
  {
    path: "/payments",
    sidebarName: "Pagos",
    component: null,
    icon: ListIcon,
  },
];
