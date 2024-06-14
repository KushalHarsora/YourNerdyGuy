import connect from '@/db/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    const responseData = await request.json();
    console.log(responseData);

    if (responseData) {
        return NextResponse.json({ message: "Data received" }, { status: 200 })
    }
}