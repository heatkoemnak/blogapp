
import { connectMongoDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET({ params }) {
    const { id } = params;
    console.log(id)

  try {
    await connectMongoDB();
    const user = await User.findById({id});
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
