// CardList - Unified list component that replaces InfoCardList and ButtonCardList
// Supports mixed types of cards (info and button) in a single list

import { IconName } from '@/components/common/Icon';
import { Subtitle } from '@/components/common/Typography';
import React from 'react';
import { View } from 'react-native';
import { ButtonCard } from './ButtonCard';
import { InfoCard } from './InfoCard';

interface CardListItem {
  id?: string;
  type: 'info' | 'button';
  title: string;
  subtitle?: string;
  description?: string;
  caption?: string;
  icon?: IconName;
  
  // Para ButtonCard
  buttonType?: 'click' | 'switch' | 'check' | 'chevron';
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  
  // Para InfoCard  
  state?: 'unread' | 'read' | 'info';
  showButton?: boolean;
  
  // Común
  onPress?: () => void;
}

interface CardListProps {
  /** Título de la sección */
  title?: string;
  /** Lista de items */
  items: CardListItem[];
  /** Callback cuando se presiona un item */
  onItemPress?: (item: CardListItem) => void;
  /** Callback cuando cambia el valor de un item (para type='button' con switch/check) */
  onItemValueChange?: (itemId: string, value: boolean) => void;
  /** Clase CSS adicional */
  className?: string;
}

export const CardList: React.FC<CardListProps> = ({
  title,
  items,
  onItemPress,
  onItemValueChange,
  className = ''
}) => {
  const handleItemPress = (item: CardListItem) => {
    if (onItemPress) {
      onItemPress(item);
    }
    if (item.onPress) {
      item.onPress();
    }
  };

  const handleItemValueChange = (itemId: string, value: boolean) => {
    if (onItemValueChange) {
      onItemValueChange(itemId, value);
    }
  };

  return (
    <View className={`gap-4 ${className}`}>
      {/* Section Title */}
      {title && (
        <Subtitle className="leading-6">
          {title}
        </Subtitle>
      )}

      {/* Cards List Container */}
      <View className="bg-gray-50 rounded-2xl border border-gray-300 overflow-hidden">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemId = item.id || `item-${index}`;
          
          if (item.type === 'button') {
            return (
              <ButtonCard
                key={itemId}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                type={item.buttonType}
                value={item.value}
                state={item.disabled ? 'disabled' : 'default'}
                isLast={isLast}
                onPress={() => handleItemPress(item)}
                onValueChange={(value) => {
                  if (item.onValueChange) {
                    item.onValueChange(value);
                  }
                  handleItemValueChange(itemId, value);
                }}
              />
            );
          } else {
            return (
              <InfoCard
                key={itemId}
                title={item.title}
                description={item.description}
                caption={item.caption}
                state={item.state}
                showButton={item.showButton}
                isLast={isLast}
                onPress={() => handleItemPress(item)}
              />
            );
          }
        })}
      </View>
    </View>
  );
};

export default CardList;
