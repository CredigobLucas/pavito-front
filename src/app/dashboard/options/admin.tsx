import { MenuOption } from "@/domain/interface/MenuOption";
import { Groups, Check } from "@mui/icons-material";

export const adminOptions: MenuOption[] = [
    {
        title: "Cuentas",
        icon: <Groups />,
        path: "/managment/admin/accounts"
    },
    {
        title: "Licencias",
        icon: <Check />,
        path: "/managment/admin/licenses"
    }
];
