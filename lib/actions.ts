"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

// FGetting user input from form
export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  // Check if user is logged in
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in", // return error if no session
      status: "ERROR",
    });

  // Get values from form (ignore "pitch" field because it's separate)
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  // Create a URL-friendly slug from the title
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Define a new startup document to save in Sanity
    const startup = {
      title,          // startup title
      description,    // description from form
      category,       // category from form
      image: link,    // using link as image field
      slug: {
        _type: "slug",   // ✅ should be "slug", not dynamic
        current: slug,   // actual slug value
      },
      author: {
        _type: "reference",  // reference field type
        _ref: session?.id,   // user ID from session
      },
      pitch,          // actual pitch content
    };

    // Save startup to Sanity database
    const result = await writeClient.create({ _type: "startup", ...startup });

    // Return success response
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    // Return error response
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
