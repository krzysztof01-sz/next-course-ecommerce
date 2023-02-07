import clsx from "clsx";

interface OrderAlertProps {
  text: string;
  variant: "success" | "error";
}

export const OrderAlert = ({ text, variant }: OrderAlertProps) => {
  return (
    <div
      className={clsx(
        "mt-4 p-3 w-fit rounded-md border-2 font-bold text-lg",
        variant === "success"
          ? "text-green-500 border-green-500"
          : "text-red-500 border-red-500"
      )}
    >
      {text}
    </div>
  );
};
