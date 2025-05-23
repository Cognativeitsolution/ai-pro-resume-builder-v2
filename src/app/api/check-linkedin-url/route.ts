import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { url } = await req.json()

    try {
        const res = await fetch(url, {
            method: 'HEAD',
        })

        return NextResponse.json({ exists: res.ok })
    } catch (error) {
        return NextResponse.json({ exists: false })
    }
}
