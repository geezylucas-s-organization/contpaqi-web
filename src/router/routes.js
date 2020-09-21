import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIcon from "@material-ui/icons/Assignment";
import {
  Home,
  Documents,
  CreateDocument,
  CreateClient,
  CreateProduct,
  ManageTemplates,
} from "../screens";

export const RoutesPrivate = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: Home,
    icon: HomeIcon,
    exact: true,
  },
  {
    path: "/createdocument",
    sidebarName: "Crear factura",
    component: CreateDocument,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/documents",
    sidebarName: "Listado de facturas",
    component: Documents,
    icon: ListIcon,
    exact: false,
  },
  {
    path: "/createproduct",
    sidebarName: "Crear producto",
    component: CreateProduct,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/createclient",
    sidebarName: "Crear cliente",
    component: CreateClient,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/managetemplates",
    sidebarName: "Administrar facturas automáticas",
    component: ManageTemplates,
    icon: AssignmentIcon,
    exact: false,
  },
];
