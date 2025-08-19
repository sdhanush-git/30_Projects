import { Button } from "@/components/ui/button";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, serTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sendMessage, setSendMessage] = useState<string>("");

  const handelSend = () => {
    setIsSending(true);

    const id = setTimeout(() => {
      setSendMessage(message);

      setMessage("");

      setIsSending(false);
    }, delay * 1000);

    serTimerId(id);
  };

  const handelCancel = () => {
    if (timerId) clearTimeout(timerId);
    setIsSending(false);
  };

//   const disappered = setTimeout(()=>{
//     setSendMessage("");
//   },10000)

  return (
    <div className="max-w-md mx-auto mt-20 border rounded-lg shadow-sm bg-white space-y-4 p-6">
      <h2 className="text-2xl font-bold text-gray-600">DM Delay App</h2>
      <Textarea
        placeholder="type Yours message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Delay Seconds"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
      />

      {!isSending ? (
        <Button className="w-full" onClick={handelSend}>
          Send Mesage...
        </Button>
      ) : (
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={handelCancel}
        >
          Cancel Sending...
        </Button>
      )}
      {sendMessage && (
        <div className="bg-green-400 border rounded p-3 text-green-900">
          <p className="font-semibold">Message Send :</p>
          <p>{sendMessage}</p>
        </div>
        // disappered()
      )}
    </div>
  );
};

export default MessageForm;
