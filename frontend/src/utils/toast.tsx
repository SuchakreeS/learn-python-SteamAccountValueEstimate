// utils/toast.ts
import { toast } from "react-toastify";
import Toast from "../components/Toast";

export function showToast(message: string) {
    toast(<Toast message={message} />, {
        closeButton: false,
        className: "!bg-transparent !p-0 !shadow-none",
    });
}