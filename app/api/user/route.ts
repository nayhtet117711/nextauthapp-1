import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const emailParam = searchParams.get("email")
        
        const emailCondition = `%${emailParam}%`
        let query = sql`select * from whitelist_users;`
        if(emailParam) query = sql`select * from whitelist_users where email like ${emailCondition};`
        
        const result = await query
        return NextResponse.json({ payload: result.rows }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}