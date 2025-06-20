import bcrypt from 'bcryptjs';
import { userValidate } from '../validation/userValidate';
import { NextResponse } from 'next/server';
import { createUserWithAccount, getUserByEmail } from '@/app/utils/user';
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password,role } = body;
    console.log(body);
    await userValidate.validate(body, { abortEarly: false });

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserWithAccount({
      name,
      email,
      role,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: 'User created successfully.' },
      {
        data: {
          ...newUser,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create user' }, error, {
      status: 500,
    });
  }
}
