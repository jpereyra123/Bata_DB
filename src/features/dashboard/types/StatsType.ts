export type StatsType = {
  total: number;
  activos: number;
  inactivos: number;
  pendientes: number;
  porEtapa: {
    etapa: string | null;
    _count: {
      id: number;
    };
  }[];
};