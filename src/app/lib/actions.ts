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
    DELETE FROM Player WHERE id = ${player.id};
`;
  revalidatePath("/players");
  redirect("/players");
};

export const editPlayer = async (player: Player) => {
  console.log(player)
  const res = await sql`
    UPDATE Player
    SET name = ${player.name}, tier = ${player.tier}
    WHERE id = ${player.id};
  `;
  console.log({res})
  revalidatePath("/players");
  redirect("/players");
};