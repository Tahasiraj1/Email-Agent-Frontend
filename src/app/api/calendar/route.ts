import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch('http://127.0.0.1:8000/calendar')
        const data = await response.json()
        console.log(data)
        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ error: 'No events found' }, { status: 400 })
    }
}