// app/api/blog/subscribe/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists in the subscribers table
    const { data: existingSubscriber, error: checkError } = await supabase
      .from("blog_subscribers")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is the error code for "no rows returned" which is expected if the email doesn't exist
      console.error("Error checking existing subscriber:", checkError);
      return NextResponse.json(
        { error: "Failed to check subscription status" },
        { status: 500 }
      );
    }

    // If email already exists, return success without inserting again
    if (existingSubscriber) {
      return NextResponse.json({
        message: "You're already subscribed!",
        alreadySubscribed: true,
      });
    }

    // Insert the new subscriber
    const { error: insertError } = await supabase.from("blog_subscribers").insert([
      {
        email,
        subscribed_at: new Date().toISOString(),
        is_active: true,
      },
    ]);

    if (insertError) {
      console.error("Error inserting subscriber:", insertError);
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: "Subscription successful",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}