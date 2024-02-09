"use server";

import { Player } from "@/app/lib/types";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const addPlayer = async (player: Player) => {
  await sql`
  INSERT INTO Player (name, tier, photo)
  VALUES (${player.name}, ${player.tier}, ${player.photo});
`;
  revalidatePath("/players");
  redirect("/players");
};

export const deletePlayer = async (player: Player) => {
  await sql`
    DELETE FROM table_name WHERE player.id ${player.id};
`;
  revalidatePath("/players");
  redirect("/players");
};
