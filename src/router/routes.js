import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import PaymentIcon from "@material-ui/icons/Payment";
import { Home, Documents, CreateDocument, Paid } from "../screens";

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
    sidebarName: "Documentos sin pago",
    component: Documents,
    icon: ListIcon,
  },
  {
    path: "/paid",
    sidebarName: "Documentos pagados",
    component: Paid,
    icon: PaymentIcon,
  },
];
