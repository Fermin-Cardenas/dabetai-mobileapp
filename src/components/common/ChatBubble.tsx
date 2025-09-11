// src/components/common/ChatBubble.tsx
import { Body, Caption } from "@/components/common/Typography";
import React from "react";
import { Image, View } from "react-native";

interface ChatBubbleProps {
  /** Unique identifier for the message */
  id: number;
  /** Message text content */
  message: string;
  /** Type of message - recipient (received) or sender (sent) */
  type: "recipient" | "sender";
  /** Optional timestamp */
  time?: string;
  /** Avatar image source for recipient messages */
  avatarSource?: any;
}

export const ChatBubble = ({
  id,
  message,
  type,
  time,
  avatarSource,
}: ChatBubbleProps) => {
  const isRecipient = type === "recipient";

  const renderMessageText = () => {
    const textColorClass = isRecipient ? "text-gray-700" : "!text-gray-50";

    return <Body className={textColorClass}>{message}</Body>;
  };

  const renderAvatar = () => {
    if (!isRecipient) return null;

    return (
      <View className="w-10 h-10 bg-gray-50 rounded-full overflow-hidden">
        {avatarSource ? (
          <Image
            source={avatarSource}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-primary-500 justify-center items-center">
            <Body className="!text-gray-50 font-bold">AI</Body>
          </View>
        )}
      </View>
    );
  };

  const renderSenderAvatar = () => {
    if (isRecipient) return null;

    return (
      <View className="w-10 h-10 bg-gray-50 rounded-full overflow-hidden">
        <View className="w-full h-full bg-gray-400 justify-center items-center">
          <Body className="!text-gray-50 font-bold">U</Body>
        </View>
      </View>
    );
  };

  return (
    <View
      className={`flex-row ${isRecipient ? "justify-start" : "justify-end"} mb-4`}
    >
      {/* Avatar para recipient */}
      {renderAvatar()}

      {/* Message content */}
      <View className={`${isRecipient ? "ml-3" : "mr-3"} flex-col gap-1`}>
        {/* Message bubble */}
        <View
          className={`px-4 py-3 rounded-2xl max-w-[280px] ${
            isRecipient ? "bg-gray-50 border border-gray-300" : "bg-primary-500"
          }`}
        >
          {renderMessageText()}
        </View>

        {/* Timestamp */}
        {time && (
          <Caption
            className={`!text-gray-500 ${isRecipient ? "text-left" : "text-right"}`}
          >
            {time}
          </Caption>
        )}
      </View>

      {/* Avatar para sender */}
      {renderSenderAvatar()}
    </View>
  );
};
