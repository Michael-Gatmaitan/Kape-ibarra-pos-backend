import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./api";

// Export the handler that integrates with Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  // Use Express to handle the incoming request
  app(req as any, res as any);
};
