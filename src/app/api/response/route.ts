import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

// Creating a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// setting the runtime to edge
export const runtime = "edge";

export async function POST(req: NextRequest) {
	// Extracting the `prompt` from the body of the request
	const { prompt } = await req.json();

	//generating the response
	const response = await Hf.textGenerationStream(
		{
			model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
			inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
			parameters: {
				max_new_tokens: 2000, // maximum token to be generated by A.I.
				// @ts-ignore
				typical_p: 0.2, // low randomness
				repetition_penalty: 1, // no repeatition penalty
				truncate: 1023, // total token length limit
				return_full_text: false, // removing the initital prompt (not working in this model)
			},
		},
		{
			use_cache: false, //disabling cache (each time new Response)
			use_gpu: true, // using GPU to improve performance
			wait_for_model: true, // reducing error resonse (waiting for the model to respond)
		}
	);

	// Converting the response into a friendly text-stream
	const stream = HuggingFaceStream(response);

	// Responding with the stream
	return new StreamingTextResponse(stream);
}
