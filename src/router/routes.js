import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import {
  Home,
  Documents,
  CreateDocument,
  CreateClient,
  CreateProduct,
} from "../screens";

export const RoutesExact = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: Home,
    icon: HomeIcon,
  },
  {
    path: "/createdocument",
    sidebarName: "Crear factura",
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
    component: CreateProduct,
    icon: CreateIcon,
  },
  {
    path: "/createclient",
    sidebarName: "Crear cliente",
    component: CreateClient,
    icon: CreateIcon,
  },
  {
    path: "/templates",
    sidebarName: "Administrar facturas automáticas",
    component: null,
    icon: ListIcon,
  },
];
