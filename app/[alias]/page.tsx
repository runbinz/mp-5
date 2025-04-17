import { redirect } from "next/navigation"
import getLink from "@/lib/getLink";

export default async function RedirectAlias({params}: {
    params: { alias: string };
}) {
    const { alias } = await params;

    const url = await getLink(alias);
    if (url === null) {
        return redirect("/");
    }

    return redirect(url);
}