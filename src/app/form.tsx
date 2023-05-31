"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home({ url }: { url: string }) {
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  useEffect(() => console.log(url), [url])

  const onSubmit = handleSubmit(async (data) => {
    const file = data.file[0];
    if (!file) return;

    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });
  });

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    >
      <input type="file" accept="image/png, image/jpeg" {...register("file")} />
      <button type="submit">Upload</button>
    </form>
  );
}
