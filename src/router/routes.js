import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import { Home, Documents, CreateDocument } from "../screens";

export const RoutesExact = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: Home,
    icon: HomeIcon,
  },
  {
    path: "/documents",
    sidebarName: "Documentos",
    component: Documents,
    icon: ListIcon,
  },
];

export const Routes = [
  {
    path: "/documents/create",
    component: CreateDocument,
  },
];
