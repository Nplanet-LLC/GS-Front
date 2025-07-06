import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // حذف الكوكي عن طريق إرجاعه بقيمة فاضية وانتهاء فوري
  response.cookies.set('token', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
