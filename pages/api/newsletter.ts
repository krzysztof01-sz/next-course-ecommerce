import type { NextApiRequest, NextApiResponse } from "next";
import { MailerliteResponseData } from "../../components/NewsletterForm";

const url = "https://connect.mailerlite.com/api/subscribers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MailerliteResponseData>
) {
  const API_KEY = process.env.MAILERLITE_API_KEY;
  if (!API_KEY) res.status(500).end();

  const { email } = JSON.parse(req.body);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    return res
      .status(500)
      .json({ success: false, data: "Something went wrong. Try again later" });
  }

  if (response.status === 201) {
    return res
      .status(201)
      .json({ success: true, data: "Welcome to my newsletter!" });
  }

  return res
    .status(500)
    .json({ success: false, data: "Something went wrong. Try again later" });
}
