import { MenuOption } from "@/domain/interface/MenuOption";
import { Settings } from "@mui/icons-material";

export const accountOptions: MenuOption[] = [
    {
        title: "Perfil",
        icon: <Settings />,
        path: "/managment/account/user"
    }
];
