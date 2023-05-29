"use client";
import { useForm } from "react-hook-form";

export default function Home({ url }: { url: string }) {
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.file[0]) return;

    await fetch(url, {
      method: "PUT",
      body: data.file[0],
      headers: {
        "Content-Type": data.file[0].type,
        "Content-Disposition": `attachment; filename="${data.file[0].name}"`,
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
