export interface PavitoEnterprise {
    ruc: string;
    razonSocial: string;
    departamento: string;
    provincia: string;
    estado: string;
    distrito: string;
    ubigeo: string;
    direccion: string;
    condicionDomicilio: string;
    telefono: string;
    correos: string;
    probabilidadSancion: number;
    colorSancion: string;
    porcentajePercentil: number;
    porcentajeTotalAcumulado: number;
    totalContratosGobpe: number;
    montoLicitacionesPen: number;
    montoLicitacionesUsd: number;
    penalidadesPen: number;
    sumaPenalidadesPen: number;
    penalidadesUsd: number; 
    sumaPenalidadesUsd: number;
    sancionesDefinitivas: number;
    sancionesTemporales: number;
    licitacionesVigentes: number;
    primeraLicitacion: string;
    ultimaActualizacion: string;
  }