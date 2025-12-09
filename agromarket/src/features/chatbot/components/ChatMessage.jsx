export function ChatMessage({ from, text }) {
  return (
    <div className={`chat-message ${from === "me" ? "me" : "bot"}`}>
      {text}
    </div>
  );
}
