// ./src/components/MessageList/MessageList.tsx

type MessageListParams = {
  messages: Array<{
    role: string | "system" | "assistant" | "user";
    content: string;
  }>;
  isLoading: boolean;
};

const MessageList = ({
  messages = [],
  isLoading,
}: MessageListParams): JSX.Element => {
  function EmptyMessagesComponent() {
    return (
      <div className="flex w-100 flex-1 flex-row justify-center">
        <h3>Send some message to start a conversation!</h3>
      </div>
    );
  }

  function RobotMessageComponent(
    content: string,
    key: number,
    isLastItem: boolean
  ) {
    return (
      <div
        id={isLastItem ? "last-item" : ""}
        className="chat-message"
        key={key}
      >
        <div className="flex items-end">
          <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
            <div>
              <span className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                {content}
              </span>
            </div>
          </div>
          <div className="order-1 h-6 w-6 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  function UserMessageComponent(
    content: string,
    key: number,
    isLastItem: boolean
  ) {
    return (
      <div
        id={isLastItem ? "last-item" : ""}
        className="chat-message"
        key={key}
      >
        <div className="flex items-end justify-end">
          <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
            <div>
              <span className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white">
                {content}
              </span>
            </div>
          </div>
          <div className="order-2 h-6 w-6 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  function BuiltMessageListComponent() {
    return (
      <>
        {messages.map((msg, idx) => {
          const { role, content } = msg;
          const isLastItem = messages.length === idx + 1;

          if (role === "assistant") {
            return RobotMessageComponent(content, idx, isLastItem);
          }
          if (role === "user") {
            return UserMessageComponent(content, idx, isLastItem);
          }

          return null;
        })}
      </>
    );
  }

  function LoadingComponent() {
    return <div>...</div>;
  }

  return (
    <div
      id="message-space"
      className="scroll-smooth scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
    >
      {messages.length === 0 ? (
        <EmptyMessagesComponent />
      ) : (
        <BuiltMessageListComponent />
      )}

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default MessageList;
