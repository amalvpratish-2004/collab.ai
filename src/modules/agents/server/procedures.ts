import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
//import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async({ input }) => {
        const [ existingAgent ] = await db
            .select({
                ...getTableColumns(agents),
                meetingCount: sql<number>`5`,
            })
            .from(agents)
            .where(eq(agents.id, input.id))

        //throw new TRPCError({ code: "BAD_REQUEST"})

        return existingAgent;
    }),
    getMany: protectedProcedure.query(async() => {
        const data = await db
            .select()
            .from(agents)

        //throw new TRPCError({ code: "BAD_REQUEST"})

        return data;
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
        //drizzle always returns array (since sql works like that)
        const [ createdAgent ] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
            })
            .returning();

        return createdAgent;

    })
});