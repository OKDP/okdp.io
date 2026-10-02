import { z } from "astro/zod";
import releaseData from "@/data/release.json";
import { getStackEntries } from "@/lib/stack";

const release = z
  .object({
    product: z.string().min(1),
    version: z.string().min(1),
    publishedOn: z.string().date(),
    notesUrl: z.string().url(),
    stackId: z
      .string()
      .regex(/^okdp-\d+(?:-\d+)+$/)
      .nullable(),
  })
  .parse(releaseData);

export async function getCurrentRelease() {
  if (release.stackId) {
    const stacks = await getStackEntries();
    if (!stacks.some((entry) => entry.id === release.stackId)) {
      throw new Error(
        `Missing inventory for release.stackId: ${release.stackId}`,
      );
    }
  }
  return release;
}
