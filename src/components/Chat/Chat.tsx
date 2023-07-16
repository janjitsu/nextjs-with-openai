import { useRef } from "react";

type ChatParams = {
  callApi: Function;
  isLoading: boolean;
};

const Chat = ({ callApi, isLoading }: ChatParams): JSX.Element => {
  const inputValueRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  return (
    <div className="mb-2 border-t-2 border-gray-200 pt-4 sm:mb-0">
      <div className="relative flex">
        <input
          ref={inputValueRef}
          type="text"
          required
          disabled={isLoading}
          placeholder={isLoading ? "Sending..." : "Send a message..."}
          className="w-full bg-gray-200 py-3 pl-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
        />

        <div className=" inset-y-0 right-0 hidden items-center sm:flex">
          <button
            type="button"
            disabled={isLoading}
            className={`bg-green-500 px-4 py-3 text-white transition duration-500 ease-in-out  focus:outline-none shadow ${
              isLoading ? "cursor-not-allowed" : "hover:bg-green-400"
            }`}
            onClick={() => {
              let { value } = inputValueRef?.current as HTMLInputElement;

              if (!value) return;

              callApi({
                role: "user",
                content: value,
              });

              /** reset input value */
              inputValueRef?.current && (inputValueRef.current.value = "");
            }}
          >
            {isLoading ? (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : (
              "GO"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
