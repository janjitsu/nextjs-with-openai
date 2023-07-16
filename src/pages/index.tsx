import { useState } from "react";
/** components */
import MessageList from "@/components/MessageList/MessageList";
import Chat from "@/components/Chat/Chat";

type StateParams = {
  isLoading: boolean;
  messages: Array<{
    role: string | "system" | "assistant" | "user";
    content: string;
  }>;
};

export default function Home(): JSX.Element {
  const [state, setState] = useState<StateParams>({
    isLoading: false,
    messages: [],
  });

  function adjustView() {
    setTimeout(() => {
      const element = document.getElementById("last-item");
      element?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  }

  async function callApi(payload: { role: string; content: string }) {
    const payloadApi = [...state.messages, payload];

    setState({
      ...state,
      messages: [...payloadApi],
      isLoading: true,
    });

    adjustView();

    try {
      const response = await fetch("/api/v1/chat", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: [...payloadApi],
        }),
      });

      if (response?.status === 200) {
        const data = await response.json();

        setState({
          ...state,
          isLoading: false,
          messages: [...payloadApi, { ...data }],
        });

        adjustView();
      } else {
        setState({
          ...state,
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.warn("< Something got wrong > ", error);
    }
  }

  return (
    <main className="container mx-auto">
      <div className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
        <MessageList messages={state.messages} isLoading={state.isLoading} />
        <Chat callApi={callApi} isLoading={state.isLoading} />
      </div>
    </main>
  );
}
