// import { connectMongoDB } from '@/libs/mongodb';
// import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { userValidate } from '../validation/userValidate';
import { NextResponse } from 'next/server';
import { createUserWithAccount, getUserByEmail } from '@/app/utils/user';
export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email,image, password } = body;

    // Basic validation
    // if (!name || !email || !password || !confirmPassword) {
    //   return NextResponse.json({ errors: { general: 'All fields are required' } }, { status: 500 });
    // }
    // Validate the user data
    await userValidate.validate(body, { abortEarly: false });

    // Connect to MongoDB
    // await connectMongoDB();

    // Check if user already exists
    // const userExists = await User.findOne({ email });
    // if (userExists) {
    //   return NextResponse.json(
    //     { message: 'User already exists.' },
    //     { status: 400 }
    //   );
    // }
    // Check if user already exists
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
      image,
      password: hashedPassword,
    });
    // const newUser = new User({ name, email, password: hashedPassword });
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
