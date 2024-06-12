"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import React from "react";

export default function Home() {


  const router = useRouter();

  return (
    <React.Fragment>
      <div className=" h-screen w-screen flex justify-center items-center">

        <Button
          className=" p-6"
          onClick={() => {
            toast.success("success", {
              richColors: true,
              style: {
                "backgroundColor": "#D5F5E3",
                "color": "black",
                "border": "none"
              },
              duration: 1500
            })
            router.push('/login');
          }}
        >
          Login
        </Button>
      </div>
    </React.Fragment>
  );
}
