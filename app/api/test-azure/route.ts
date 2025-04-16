// app/api/test-azure/route.ts
import { NextRequest, NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Initialize Azure OpenAI client
const azureInferenceEndpoint = process.env.AZURE_INFERENCE_SDK_ENDPOINT || "https://techc-m9gn6hvm-eastus2.services.ai.azure.com/models";
const azureInferenceKey = process.env.AZURE_INFERENCE_SDK_KEY as string;
const deploymentName = process.env.DEPLOYMENT_NAME || "Phi-4";

const client = new ModelClient(
  azureInferenceEndpoint,
  new AzureKeyCredential(azureInferenceKey)
);

export async function GET(request: NextRequest) {
  try {
    // Simple test message for Azure OpenAI
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant that responds in valid JSON format."
      },
      {
        role: "user",
        content: "Return a simple JSON array with 3 career suggestions. Each should have a title and description. Format as valid JSON only."
      },
    ];

    // Make the API call to Azure OpenAI
    const response = await client.path("chat/completions").post({
      body: {
        messages: messages,
        max_tokens: 500,
        model: deploymentName,
      },
    });

    if (!response.body) {
      return NextResponse.json(
        { error: "No response from Azure OpenAI" },
        { status: 500 }
      );
    }

    // Return both the raw response and attempt to parse it
    const rawContent = response.body.choices[0].message.content;
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(rawContent);
    } catch (e) {
      parsedContent = null;
    }
    
    return NextResponse.json({ 
      success: true,
      model: deploymentName,
      endpoint: azureInferenceEndpoint,
      rawResponse: rawContent,
      parsedResponse: parsedContent,
      isValidJson: parsedContent !== null
    });
  } catch (error) {
    console.error("Error testing Azure OpenAI:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        model: deploymentName,
        endpoint: azureInferenceEndpoint 
      },
      { status: 500 }
    );
  }
}