import { simulateReadableStream } from "ai";
import { MockLanguageModelV3 } from "ai/test";
import { getResponseChunksByPrompt } from "@/tests/prompts/utils";

const stopFinishReason = { unified: "stop", raw: "stop" } as const;

const createUsage = (inputTotal: number, outputTotal: number) => ({
  inputTokens: {
    total: inputTotal,
    noCache: inputTotal,
    cacheRead: 0,
    cacheWrite: 0,
  },
  outputTokens: {
    total: outputTotal,
    text: outputTotal,
    reasoning: 0,
  },
});

export const chatModel = new MockLanguageModelV3({
  doGenerate: async () => ({
    finishReason: stopFinishReason,
    usage: createUsage(10, 20),
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt),
    }),
  }),
});

export const reasoningModel = new MockLanguageModelV3({
  doGenerate: async () => ({
    finishReason: stopFinishReason,
    usage: createUsage(10, 20),
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt, true),
    }),
  }),
});

export const titleModel = new MockLanguageModelV3({
  doGenerate: async () => ({
    finishReason: stopFinishReason,
    usage: createUsage(10, 20),
    content: [{ type: "text", text: "This is a test title" }],
    warnings: [],
  }),
  doStream: async () => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: [
        { id: "1", type: "text-start" },
        { id: "1", type: "text-delta", delta: "This is a test title" },
        { id: "1", type: "text-end" },
        {
          type: "finish",
          finishReason: stopFinishReason,
          usage: createUsage(3, 10),
        },
      ],
    }),
  }),
});

export const artifactModel = new MockLanguageModelV3({
  doGenerate: async () => ({
    finishReason: stopFinishReason,
    usage: createUsage(10, 20),
    content: [{ type: "text", text: "Hello, world!" }],
    warnings: [],
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
  }),
});
