"use client";
import { removePaymentMethod } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  pmid?: string | null;
}

const CardConnectRemoveContainer = ({ pmid }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onRemove = () => {
    startTransition(() => {
      removePaymentMethod().then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  };
  return (
    <div>
      {pmid ? (
        <Button variant="destructive" onClick={onRemove} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wallet className="mr-2 h-4 w-4" />
          )}{" "}
          Remove Card
        </Button>
      ) : (
        <Link href="/dashboard/student/payment/new">
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Card
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CardConnectRemoveContainer;
