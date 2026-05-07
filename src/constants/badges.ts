export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  howToUnlock: string;
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'early_bird',
    name: 'Madrugador',
    icon: '🌅',
    description: 'Registras tus datos antes de las 8:00 AM.',
    howToUnlock: 'Realiza un registro de peso entre las 5:00 AM y las 8:00 AM.'
  },
  {
    id: 'consistent',
    name: 'Constante',
    icon: '🔥',
    description: 'Has mantenido una racha de registros.',
    howToUnlock: 'Registra tu peso durante 3 días seguidos.'
  },
  {
    id: 'bmi_pro',
    name: 'IMC Sano',
    icon: '✅',
    description: 'Tu Índice de Masa Corporal está en el rango ideal.',
    howToUnlock: 'Mantén un IMC entre 18.5 y 24.9.'
  },
  {
    id: 'goal_setter',
    name: 'Meta Lograda',
    icon: '🎯',
    description: 'Has alcanzado tu objetivo de peso.',
    howToUnlock: 'Llega a tu peso meta definido en el perfil.'
  },
  {
    id: 'water_master',
    name: 'Hidratado',
    icon: '💧',
    description: 'Nivel óptimo de agua corporal.',
    howToUnlock: 'Registra un porcentaje de agua superior al 60%.'
  },
  {
    id: 'muscle_hero',
    name: 'Hércules',
    icon: '💪',
    description: 'Gran porcentaje de masa muscular.',
    howToUnlock: 'Registra más del 40% de masa muscular.'
  },
  {
    id: 'protein_king',
    name: 'Carnívoro',
    icon: '🥩',
    description: 'Niveles altos de proteína.',
    howToUnlock: 'Alcanza un nivel de proteína superior al 18%.'
  },
  {
    id: 'bone_shield',
    name: 'Escudo Óseo',
    icon: '🦴',
    description: 'Masa ósea saludable.',
    howToUnlock: 'Mantén una masa ósea superior a 2.5kg.'
  },
  {
    id: 'fat_burner',
    name: 'Fénix',
    icon: '🔥',
    description: 'Has reducido tu grasa corporal significativamente.',
    howToUnlock: 'Reduce un 2% de grasa corporal entre dos registros.'
  },
  {
    id: 'metabolic_warrior',
    name: 'Guerrero',
    icon: '⚔️',
    description: 'Edad metabólica menor a tu edad real.',
    howToUnlock: 'Logra que tu edad metabólica sea al menos 5 años menor que tu edad cronológica.'
  },
  {
    id: 'tracker_elite',
    name: 'Élite',
    icon: '⭐',
    description: 'Usuario avanzado con múltiples registros.',
    howToUnlock: 'Completa un total de 50 registros biométricos.'
  },
  {
    id: 'weight_loss_pro',
    name: 'Experto',
    icon: '🏆',
    description: 'Has perdido tus primeros 5 kilos.',
    howToUnlock: 'Logra una pérdida de peso acumulada de 5kg.'
  },
  {
    id: 'scale_veteran',
    name: 'Veterano',
    icon: '🎖️',
    description: 'Llevas más de 6 meses usando el sistema.',
    howToUnlock: 'Mantén la aplicación instalada y activa por 180 días.'
  },
  {
    id: 'health_journey',
    name: 'Viajero',
    icon: '🗺️',
    description: 'Has registrado datos en diferentes ciudades.',
    howToUnlock: 'Uso de la app en diferentes localizaciones (GPS).'
  },
  {
    id: 'bio_hacker',
    name: 'Hacker',
    icon: '💻',
    description: 'Has editado un registro pasado para precisión.',
    howToUnlock: 'Utiliza la función de edición en el historial.'
  },
  {
    id: 'stats_collector',
    name: 'Coleccionista',
    icon: '📂',
    description: 'Has llenado todos los campos de un registro.',
    howToUnlock: 'Completa absolutamente todos los campos biométricos al crear un registro.'
  },
  {
    id: 'visionary',
    name: 'Visionario',
    icon: '👁️',
    description: 'Has analizado tus tendencias gráficas.',
    howToUnlock: 'Abre el análisis detallado de métricas en el Lobby.'
  },
  {
    id: 'disciplined',
    name: 'Disciplinado',
    icon: '🧘',
    description: 'Registros realizados a la misma hora exacta.',
    howToUnlock: 'Realiza 3 registros consecutivos a la misma hora del día (margen de 5 min).'
  },
  {
    id: 'unstoppable',
    name: 'Imparable',
    icon: '🚀',
    description: 'Más de 10 registros en un mes.',
    howToUnlock: 'Mantén una alta frecuencia de pesaje durante 30 días.'
  },
  {
    id: 'legendary',
    name: 'Leyenda',
    icon: '👑',
    description: 'Has alcanzado el Nivel 50.',
    howToUnlock: 'Llega al nivel de usuario 50 acumulando XP.'
  }
];
