'use client'

import Formula from "@/components/Formula";
import { useFormulaStore } from "@/store/store";

export default function Home() {
  const {result} = useFormulaStore();

  return (
    <div className="m-5">
      <div>
          Result: {result}
      </div>
      <Formula />
    </div>

  );
}
