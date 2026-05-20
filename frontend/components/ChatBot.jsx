"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import axios from "axios";

import {
  Bot,
  Send,
  X,
  MessageCircle,
} from "lucide-react";

const url =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ChatBot() {

  const [open, setOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] = useState([
    {
      type: "bot",
      text:
        "Hi 👋 I am your Hostel AI Assistant. Ask me anything.",
    },
  ]);

  // AUTO SCROLL REF
  const bottomRef = useRef(null);

  // AUTO SCROLL EFFECT
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [chat, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    const currentMessage = message;

    setMessage("");

    try {

      const res = await axios.post(
        `${url}/api/v1/chat`,
        {
          message: currentMessage,
        },
        {
          withCredentials: true,
        }
      );

      const botMessage = {
        type: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (e) {

      console.log(e);

      setChat((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            "Something went wrong while contacting AI.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

      {/* CHAT ICON */}

      {!open && (

        <button
          onClick={() =>
            setOpen(true)
          }
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
          <MessageCircle
            size={22}
            className="text-white"
          />
        </button>

      )}

      {/* CHAT WINDOW */}

      {open && (

        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[650px] rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-[0_0_45px_rgba(0,0,0,0.7)] flex flex-col">

          {/* HEADER */}

          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1c1c1c]">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">

                <Bot
                  size={24}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-white font-bold text-xl">
                  Hostel AI
                </h2>

                <p className="text-green-400 text-xs">
                  Online
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
            >

              <X
                size={22}
                className="text-gray-300"
              />

            </button>

          </div>

          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#0f0f0f]">

            {chat.map((msg, i) => (

              <div
                key={i}
                className={`flex ${
                  msg.type === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                      : "bg-[#1f1f1f] text-gray-200 border border-white/5 rounded-bl-sm"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))}

            {/* TYPING */}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-[#1f1f1f] border border-white/5 px-4 py-3 rounded-2xl text-gray-300 text-sm animate-pulse">

                  AI is typing...

                </div>

              </div>

            )}

            {/* AUTO SCROLL TARGET */}

            <div ref={bottomRef} />

          </div>

          {/* INPUT */}

          <div className="p-4 border-t border-white/10 bg-[#121212]">

            <div className="flex items-center gap-3">

              <input
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    sendMessage();

                  }

                }}
                placeholder="Ask something..."
                className="flex-1 bg-[#1f1f1f] border border-white/5 text-white px-4 py-3 rounded-2xl outline-none focus:border-blue-500 placeholder:text-gray-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:scale-105 transition disabled:opacity-50"
              >

                <Send size={18} />

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}