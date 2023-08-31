import { AlertMessage } from "@/domain/interface/AlertMessage";
import { PavitoDataCompany } from "@/domain/interface/PavitoDataCompany";
import { PavitoDataFilters } from "@/domain/interface/PavitoDataFilters";

export const FILTROS_PROSPECTOS = "filtrosProspectos";
export const FILTROS_CONTRATOS = "filtrosContratos";

export const SAVE_FILTERS_AS_PRESET = (localStorageKey: string, 
    filters: PavitoDataFilters | PavitoDataCompany, 
    openAlertMessage: (alert: AlertMessage) => void): void => {
    openAlertMessage({
        horizontal: "center",
        vertical: "top",
        severity: "success",
        message: "Filtros guardados como predeterminado correctamente"
    })
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
};
