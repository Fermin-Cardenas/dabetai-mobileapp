// Icon - Unified icon component using Feather icons
import { Feather } from '@expo/vector-icons';
import React from 'react';

// Mapping of custom icon names to Feather icon names
const IconMap = {
  // Navigation
  'home': 'home',
  'prediction': 'activity',
  'record': 'file-text',
  'chat': 'message-circle',
  'config': 'settings',
  
  // Actions
  'sync': 'refresh-cw',
  'hospital': 'heart',
  'device': 'smartphone',
  'doctor': 'user-plus',
  'notification': 'bell',
  'search': 'search',
  'filter': 'filter',
  'add': 'plus',
  'edit': 'edit',
  'delete': 'trash-2',
  'save': 'check',
  'cancel': 'x',
  'send': 'send',
  
  // UI Elements
  'chevron-right': 'chevron-right',
  'chevron-left': 'chevron-left',
  'chevron-down': 'chevron-down',
  'chevron-up': 'chevron-up',
  'expand-more': 'chevron-down',
  'expand-less': 'chevron-up',
  'arrow-right': 'arrow-right',
  'arrow-left': 'arrow-left',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'trend-up': 'trending-up',
  'trend-down': 'trending-down',
  'plus-circle': 'plus-circle',
  'menu': 'menu',
  'close': 'x',
  'check': 'check',
  'info': 'info',
  'warning': 'alert-triangle',
  'error': 'alert-circle',
  'success': 'check-circle',
  
  // Medical/Health
  'glucose': 'droplet',
  'insulin': 'heart',
  'medication': 'pill',
  'activity': 'activity',
  'heart': 'heart',
  'eye': 'eye',
  'eye-off': 'eye-off',
  'foot': 'user',
  'kidney': 'circle',
  'nerve': 'zap',
  
  // Data/Stats
  'chart': 'bar-chart-2',
  'calendar': 'calendar',
  'clock': 'clock',
  'box': 'box',
  'hexagon': 'hexagon',
  
  // Communication
  'phone': 'phone',
  'mail': 'mail',
  'share': 'share-2',
  'link': 'link',
  
  // Files/Documents
  'file': 'file',
  'folder': 'folder',
  'download': 'download',
  'upload': 'upload',
  
  // User/Account
  'user': 'user',
  'users': 'users',
  'profile': 'user-circle',
  'lock': 'lock',
  'unlock': 'unlock',
  
  // Generic
  'star': 'star',
  'bookmark': 'bookmark',
  'tag': 'tag',
  'flag': 'flag',
} as const;

export type IconName = keyof typeof IconMap;

interface IconProps {
  /** Nombre del icono */
  name: IconName;
  /** Tamaño del icono */
  size?: number;
  /** Color del icono */
  color?: string;
  /** Clase CSS adicional */
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className = '!text-gray-700'
}) => {
  const featherIconName = IconMap[name];
  
  if (!featherIconName) {
    console.warn(`Icon "${name}" not found in IconMap. Available icons:`, Object.keys(IconMap));
    return null;
  }

  return (
    <Feather
      name={featherIconName as any}
      size={size}
      color={color}
      className={!color ? className : undefined}
    />
  );
};

export default Icon;
