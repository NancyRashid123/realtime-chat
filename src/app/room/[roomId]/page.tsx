"use client";

import { useUsername } from "@/hooks/use-username";
import { api } from "@/lib/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useRealtime } from "@upstash/realtime/client";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const router = useRouter();

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState("COPY");
  const [inputValue, setInputValue] = useState("");
  const [joined, setJoined] = useState(false);
  const { username } = useUsername();
  const inputRef = useRef<HTMLInputElement>(null);

  function formatTimeRemaining(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const copyLink = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url);
    setCopyStatus("COPIED!");

    setTimeout(() => setCopyStatus("COPY"), 2000);
  };

  const { mutate: joinRoom} = useMutation({
  mutationFn: async () => {
    const res = await api.room.join.post(null, {
      query: { roomId },
    });

    if (res.error) {
      throw new Error("Failed to join room");
    }

    return res.data;
  },
  onSuccess: () => {
    setJoined(true);
  },
  onError: () => {
    router.push("/?error=room-full");
  },
});

useEffect(() => {
  if (roomId) {
    joinRoom();
  }
}, [roomId]);

  const { data: ttlData } = useQuery({
  queryKey: ["ttl", roomId],
  queryFn: async () => {
    const res = await api.room.ttl.get({
      query: { roomId },
    });

    return res.data;
  },
  enabled: joined,
});

  useEffect(() => {
    if (ttlData?.ttl !== undefined) {
      setTimeRemaining(ttlData.ttl);
    }
  }, [ttlData]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining < 0) return;

    if (timeRemaining === 0) {
      router.push("/?destroyed=true");
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, router]);

 const { data: messages, refetch } = useQuery({
  queryKey: ["messages", roomId],
  queryFn: async () => {
    const res = await api.messages.get({
      query: { roomId },
    });

    return res.data;
  },
  enabled: joined,
});

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      await api.messages.post(
        { sender: username, text },
        { query: { roomId } }
      );

      setInputValue("");
    },
  });

  useRealtime({
    channels: joined ? [roomId] : [],
    events: ["chat.message", "chat.destroy"],
    onData: ({ event }) => {
      if (event === "chat.message") {
        refetch();
      }

      if (event === "chat.destroy") {
        router.push("/?destroyed=true");
      }
    },
  });

  const { mutate: deleteRoom } = useMutation({
    mutationFn: async () => {
      await api.room.delete(null, {
        query: { roomId },
      });
    },
  });

  return (
    <main className="flex h-screen max-h-screen flex-col overflow-hidden">
      <header className="shrink-0 border-b border-zinc-800 bg-zinc-900/30 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <div className="min-w-0">
              <span className="block text-[10px] uppercase text-zinc-500 sm:text-xs">
                Room ID
              </span>

              <div className="flex items-center gap-2">
                <span className="max-w-[150px] truncate text-sm font-bold text-green-500 sm:max-w-none sm:text-base">
                  {roomId.slice(0, 10) + "..."}
                </span>

                <button
                  onClick={copyLink}
                  className="shrink-0 rounded bg-zinc-800 px-2 py-1 text-[9px] text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200 sm:text-[10px]"
                >
                  {copyStatus}
                </button>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

            <div className="shrink-0">
              <span className="block text-[10px] uppercase text-zinc-500 sm:text-xs">
                Self-Destruct
              </span>

              <span
                className={`text-sm font-bold sm:text-base ${
                  timeRemaining !== null && timeRemaining < 60
                    ? "text-red-500"
                    : "text-amber-500"
                }`}
              >
                {timeRemaining !== null
                  ? formatTimeRemaining(timeRemaining)
                  : "--:--"}
              </span>
            </div>
          </div>

          <button
            onClick={() => deleteRoom()}
            className="flex w-full items-center justify-center gap-2 rounded bg-zinc-800 px-3 py-2.5 text-xs font-bold text-zinc-400 transition-all duration-500 hover:bg-red-600 hover:text-white sm:w-auto sm:py-1.5 cursor-pointer"
          >
            <span>💣</span>
            DESTROY NOW
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3 sm:p-4">
        {messages?.messages.length === 0 && (
          <div className="flex h-full items-center justify-center px-4">
            <p className="text-center font-mono text-xs text-zinc-600 sm:text-sm">
              No messages yet, start the conversation.
            </p>
          </div>
        )}

        {messages?.messages.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start">
            <div className="max-w-[95%] sm:max-w-[80%]">
              <div className="mb-1 flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span
                  className={`text-xs font-bold ${
                    msg.sender === username
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {msg.sender === username ? "YOU" : msg.sender}
                </span>

                <span className="text-[10px] text-zinc-600">
                  {format(msg.timestamp, "HH:mm")}
                </span>
              </div>

              <p className="break-all text-sm leading-relaxed text-zinc-300">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-zinc-800 bg-zinc-900/30 p-3 sm:p-4">
        <div className="flex items-stretch gap-2 sm:gap-4">
          <div className="relative min-w-0 flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 sm:left-4">
              {">"}
            </span>

            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={inputValue}
              placeholder="Type message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage({ text: inputValue });
                  inputRef.current?.focus();
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-full min-h-[44px] w-full border border-zinc-800 bg-black py-3 pl-7 pr-3 text-sm text-zinc-100 transition-colors placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none sm:pl-8 sm:pr-4"
            />
          </div>

          <button
            onClick={() => {
              sendMessage({ text: inputValue });
              inputRef.current?.focus();
            }}
            disabled={!inputValue.trim() || isPending}
            className="min-w-[65px] shrink-0 bg-zinc-800 px-3 text-xs font-bold text-zinc-400 transition-all hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[80px] sm:px-6 sm:text-sm"
          >
            SEND
          </button>
        </div>
      </div>
    </main>
  );
}