"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

export type SuggestionKind = "productIdeas" | "generateDocuments";

type SuggestedActionsProps = {
  chatId: string;
  kind?: SuggestionKind;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

function PureSuggestedActions({ chatId, sendMessage, kind = "productIdeas"}: SuggestedActionsProps) {
  const groupOfSuggestedActions = {
    productIdeas: [
      {
        title: "I'd like to realize an app like Tinder, but for dogs!",
        fullDescription: null,
      },
      {
        title: "An app to learn how to code with micro learning lessons",
        fullDescription: null,
      },
      {
        title: "The final ecommerce for mechanical keyboards",
        fullDescription: null,
      },
      {
        title: "Another stupid wrapper around ChatGPT!",
        fullDescription: null,
      },
    ],
    generateDocuments: [
      {
        title: "Generate a Product Requirement Document 📄",
        fullDescription: `
          Using the answers above, generate a detailed Product Requirement
          Document with clear features, functionality, and priorities.
        `,
      },
      {
        title: "Generate a Risk Analysis Document ⚠️",
        fullDescription: "Using the answers above, generate a detailed Risk Analysis Document.",
      }
    ],
  };
  const suggestedActions = groupOfSuggestedActions[kind];

  return (
    <div
      className="grid w-full gap-2 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={suggestedAction.title}
          transition={{ delay: 0.05 * index }}
        >
          <Suggestion
            className="h-auto w-full whitespace-normal p-3 text-left"
            onClick={(suggestion) => {
              window.history.replaceState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
              });
            }}
            suggestion={suggestedAction.fullDescription || suggestedAction.title}
          >
            {suggestedAction.title}
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = PureSuggestedActions;
