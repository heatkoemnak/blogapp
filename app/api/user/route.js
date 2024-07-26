import { connectMongoDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email } = await req.json();
  try {
    await connectMongoDB();
    await User.create({
      name,
      email,
    });
    return NextResponse.json(
      { message: 'User created successful.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Fail to create user' },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'No data found' }, { status: 500 });
  }
}
