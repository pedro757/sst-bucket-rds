import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Form from "./form";

export default async function Page() {
  const command = new PutObjectCommand({
    ACL: "private",
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return <Form url={url} />;
}

export const revalidate = false;
