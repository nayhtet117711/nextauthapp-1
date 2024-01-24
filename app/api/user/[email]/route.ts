import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest, context: { params: { email: string } }) {
    try {
        const result = await sql`select * from whitelist_users where email=${context.params.email};`
        return NextResponse.json({ payload: result.rows.find(v => v) }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}