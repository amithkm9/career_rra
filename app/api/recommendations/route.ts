// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Azure OpenAI client
const azureInferenceEndpoint = process.env.AZURE_INFERENCE_SDK_ENDPOINT || "https://techc-m9gn6hvm-eastus2.services.ai.azure.com/models";
const azureInferenceKey = process.env.AZURE_INFERENCE_SDK_KEY as string;
const deploymentName = process.env.DEPLOYMENT_NAME || "Phi-4";

const client = new ModelClient(
  azureInferenceEndpoint,
  new AzureKeyCredential(azureInferenceKey)
);

export async function POST(request: NextRequest) {
  try {
    // Get user ID from request body
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in request" },
        { status: 400 }
      );
    }

    // Fetch user profile data from Supabase
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("discovery_data")
      .eq("id", userId)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: "Failed to fetch user profile data" },
        { status: 404 }
      );
    }

    const discoveryData = profileData.discovery_data;

    if (!discoveryData) {
      return NextResponse.json(
        { error: "No discovery data found for user" },
        { status: 404 }
      );
    }

    // Prepare the prompt for Azure OpenAI
    const formattedData = {
      skills: {
        selected: discoveryData.skills.selected,
        additional_info: discoveryData.skills.additional_info
      },
      values: {
        selected: discoveryData.values.selected,
        additional_info: discoveryData.values.additional_info
      },
      interests: {
        selected: discoveryData.interests.selected,
        additional_info: discoveryData.interests.additional_info
      },
      timestamp: discoveryData.timestamp,
      "Resume Summary": {
        skills: [], // If available, parse from CV 
        projects: [], // If available, parse from CV
        experiences: [], // If available, parse from CV
        education: {} // If available, parse from CV
      }
    };

    // Create the request for Azure OpenAI
    const messages = [
      {
        role: "system",
        content: `You are a career coach and AI expert who helps individuals identify the most suitable career roles for them.
          Given the following information:
          Resume: {Resume Summary if provided}
          Skills: ${JSON.stringify(formattedData.skills)}
          Interests: ${JSON.stringify(formattedData.interests)}
          Values: ${JSON.stringify(formattedData.values)}
          Based on this data, analyze the individual's background and suggest the top 3-5 career roles that are best suited for them.
          For each career role, provide the following fields in the response:
          [
            {
              "role_title": "Job Title",
              "description": "A 2-3 sentence overview of what this role entails.",
              "why_it_fits_professionally": "Explain why this role aligns with the individual's professional background, experience, or skills.",
              "why_it_fits_personally": "Explain why this role fits their personality, values, lifestyle preferences, or interests."
            }
          ]
          Ensure that each recommendation is personalized and clearly connected to the provided data. Avoid generic job descriptions.
          Only provide the 3 JSONs as response, and no other text.`
      },
      {
        role: "user",
        content: JSON.stringify(formattedData)
      },
    ];

    // Make the API call to Azure OpenAI
    const response = await client.path("chat/completions").post({
      body: {
        messages: messages,
        max_tokens: 1500,
        model: deploymentName,
      },
    });

    if (!response.body) {
      return NextResponse.json(
        { error: "No response from Azure OpenAI" },
        { status: 500 }
      );
    }

    // Parse the response
    let roleRecommendations;
    try {
      const responseContent = response.body.choices[0].message.content;
      roleRecommendations = JSON.parse(responseContent);
    } catch (error) {
      console.error("Error parsing Azure OpenAI response:", error);
      return NextResponse.json(
        { error: "Failed to parse recommendations" },
        { status: 500 }
      );
    }

    // Return the recommendations
    return NextResponse.json({ recommendations: roleRecommendations });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}